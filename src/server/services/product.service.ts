import { and, count, eq, ilike, inArray, or } from 'drizzle-orm'
import type { SQL } from 'drizzle-orm'

import type { ProductCreate, ProductUpdate } from '@/schemas'
import type { PaginatedProducts } from '@/types/product'
import { db } from '@/lib/drizzle'
import { deleteFromR2 } from '@/lib/r2'
import { product, productBadge, productCategory } from '@/lib/schema'

export class ProductService {
  /**
   * Calculate effective price with discount
   */
  calculateEffectivePrice(
    originalPrice: number,
    discountPercent: number | null,
    discountAmount: number | null,
  ): number {
    if (discountPercent !== null && discountPercent > 0) {
      return originalPrice * (1 - discountPercent / 100)
    }
    if (discountAmount !== null && discountAmount > 0) {
      return Math.max(0, originalPrice - discountAmount)
    }
    return originalPrice
  }

  /**
   * Get all products with categories
   */
  async getAll() {
    const products = await db.query.product.findMany({
      with: {
        categories: {
          with: {
            category: {
              columns: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        badges: {
          with: {
            badge: true,
          },
        },
      },
      orderBy: (prod, { desc: descending }) => [descending(prod.createdAt)],
    })

    return products
  }

  /**
   * Get paginated products with server-side filters
   */
  async getPaginated(query: {
    badgeIds?: Array<string>
    categoryIds?: Array<string>
    isActive?: 'all' | 'active' | 'inactive'
    isFeatured?: 'all' | 'featured' | 'not-featured'
    page: number
    pageSize: number
    search?: string
  }): Promise<PaginatedProducts> {
    const {
      badgeIds,
      categoryIds,
      isActive,
      isFeatured,
      page,
      pageSize,
      search,
    } = query
    const offset = (page - 1) * pageSize

    // Build WHERE conditions
    const conditions: Array<SQL | undefined> = []

    // Search filter (name or origin)
    if (search && search.trim()) {
      const searchTerm = `%${search.trim()}%`
      conditions.push(
        or(ilike(product.name, searchTerm), ilike(product.origin, searchTerm)),
      )
    }

    // Active status filter
    if (isActive === 'active') {
      conditions.push(eq(product.isActive, true))
    } else if (isActive === 'inactive') {
      conditions.push(eq(product.isActive, false))
    }

    // Featured status filter
    if (isFeatured === 'featured') {
      conditions.push(eq(product.isFeatured, true))
    } else if (isFeatured === 'not-featured') {
      conditions.push(eq(product.isFeatured, false))
    }

    // For category filtering, we need a subquery approach
    if (categoryIds && categoryIds.length > 0) {
      const productCategories = await db
        .select({ productId: productCategory.productId })
        .from(productCategory)
        .where(inArray(productCategory.categoryId, categoryIds))

      const productIdsFromCategories = [
        ...new Set(productCategories.map((pc) => pc.productId)),
      ]

      if (productIdsFromCategories.length === 0) {
        // No products match the categories, return empty
        return { items: [], page, pageSize, total: 0, totalPages: 0 }
      }
      conditions.push(inArray(product.id, productIdsFromCategories))
    }

    // For badge filtering
    if (badgeIds && badgeIds.length > 0) {
      const productBadgesResult = await db
        .select({ productId: productBadge.productId })
        .from(productBadge)
        .where(inArray(productBadge.badgeId, badgeIds))

      const productIdsFromBadges = [
        ...new Set(productBadgesResult.map((pb) => pb.productId)),
      ]

      if (productIdsFromBadges.length === 0) {
        return { items: [], page, pageSize, total: 0, totalPages: 0 }
      }
      conditions.push(inArray(product.id, productIdsFromBadges))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    // Get total count
    const [{ total }] = await db
      .select({ total: count() })
      .from(product)
      .where(whereClause)

    // Get paginated products with relations
    const products = await db.query.product.findMany({
      limit: pageSize,
      offset,
      orderBy: (prod, { desc: descending }) => [descending(prod.createdAt)],
      where: whereClause,
      with: {
        badges: {
          with: { badge: true },
        },
        categories: {
          with: {
            category: {
              columns: { id: true, name: true, slug: true },
            },
          },
        },
      },
    })

    return {
      items: products,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    }
  }

  /**
   * Get single product with full relations
   */
  async getById(id: string) {
    const prod = await db.query.product.findFirst({
      where: eq(product.id, id),
      with: {
        categories: {
          with: {
            category: true,
          },
        },
        badges: {
          with: {
            badge: true,
          },
        },
      },
    })

    return prod ?? null
  }

  /**
   * Create product with categories and badges
   */
  async create(data: ProductCreate) {
    const { categoryIds, badgeIds = [], ...productData } = data

    // Create product
    const now = new Date()
    const [newProduct] = await db
      .insert(product)
      .values({
        ...(productData as typeof product.$inferInsert),
        createdAt: now,
        updatedAt: now,
      })
      .returning()

    // Create category associations
    if (categoryIds.length > 0) {
      await db.insert(productCategory).values(
        categoryIds.map((categoryId) => ({
          productId: newProduct.id,
          categoryId,
        })),
      )
    }

    // Create badge associations
    if (badgeIds.length > 0) {
      await db.insert(productBadge).values(
        badgeIds.map((badgeId) => ({
          productId: newProduct.id,
          badgeId,
        })),
      )
    }

    // Fetch the product with relations
    const prodWithRelations = await db.query.product.findFirst({
      where: eq(product.id, newProduct.id),
      with: {
        categories: {
          with: {
            category: true,
          },
        },
        badges: {
          with: {
            badge: true,
          },
        },
      },
    })

    return prodWithRelations
  }

  /**
   * Update product, categories, and badges
   */
  async update(data: ProductUpdate) {
    const { id, categoryIds, badgeIds, ...productData } = data

    // Si nouvelle image fournie, supprimer l'ancienne de R2
    if (productData.imageKey) {
      const existingProduct = await db.query.product.findFirst({
        where: eq(product.id, id),
        columns: { imageKey: true },
      })

      if (
        existingProduct?.imageKey &&
        existingProduct.imageKey !== productData.imageKey
      ) {
        await deleteFromR2(existingProduct.imageKey)
      }
    }

    // If categoryIds or badgeIds provided, update associations
    if (categoryIds !== undefined || badgeIds !== undefined) {
      // Update categories if provided
      if (categoryIds !== undefined) {
        await db
          .delete(productCategory)
          .where(eq(productCategory.productId, id))

        if (categoryIds.length > 0) {
          await db.insert(productCategory).values(
            categoryIds.map((categoryId) => ({
              productId: id,
              categoryId,
            })),
          )
        }
      }

      // Update badges if provided
      if (badgeIds !== undefined) {
        await db.delete(productBadge).where(eq(productBadge.productId, id))

        if (badgeIds.length > 0) {
          await db.insert(productBadge).values(
            badgeIds.map((badgeId) => ({
              productId: id,
              badgeId,
            })),
          )
        }
      }

      // Update product
      await db
        .update(product)
        .set({
          ...(productData as Partial<typeof product.$inferInsert>),
          updatedAt: new Date(),
        })
        .where(eq(product.id, id))

      // Fetch updated product with relations
      const updatedProduct = await db.query.product.findFirst({
        where: eq(product.id, id),
        with: {
          categories: {
            with: {
              category: true,
            },
          },
          badges: {
            with: {
              badge: true,
            },
          },
        },
      })

      return updatedProduct
    }

    // No associations update, just product fields
    await db
      .update(product)
      .set({
        ...(productData as Partial<typeof product.$inferInsert>),
        updatedAt: new Date(),
      })
      .where(eq(product.id, id))

    const updatedProduct = await db.query.product.findFirst({
      where: eq(product.id, id),
      with: {
        badges: {
          with: {
            badge: true,
          },
        },
      },
    })

    return updatedProduct
  }

  /**
   * Delete product (cascade will remove ProductCategory)
   */
  async delete(id: string) {
    // Récupérer imageKey avant suppression
    const existingProduct = await db.query.product.findFirst({
      where: eq(product.id, id),
      columns: { imageKey: true },
    })

    // Supprimer le produit de la DB
    const [deletedProduct] = await db
      .delete(product)
      .where(eq(product.id, id))
      .returning()

    // Supprimer l'image de R2 si elle existe
    if (existingProduct?.imageKey) {
      await deleteFromR2(existingProduct.imageKey)
    }

    return deletedProduct
  }

  /**
   * Update product categories only
   */
  async updateCategories(productId: string, categoryIds: Array<string>) {
    await db
      .delete(productCategory)
      .where(eq(productCategory.productId, productId))

    if (categoryIds.length > 0) {
      await db.insert(productCategory).values(
        categoryIds.map((categoryId) => ({
          productId,
          categoryId,
        })),
      )
    }

    const prod = await db.query.product.findFirst({
      where: eq(product.id, productId),
      with: {
        categories: {
          with: {
            category: true,
          },
        },
      },
    })

    return prod ?? null
  }

  /**
   * Get featured products ordered by featuredOrder
   */
  async getFeatured() {
    const products = await db.query.product.findMany({
      where: (prod, { and: andFn, eq: equals }) =>
        andFn(equals(prod.isFeatured, true), equals(prod.isActive, true)),
      with: {
        categories: {
          with: {
            category: {
              columns: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        badges: {
          with: {
            badge: true,
          },
        },
      },
      orderBy: (prod, { asc }) => [asc(prod.featuredOrder), asc(prod.name)],
    })

    return products
  }

  /**
   * Toggle isActive status
   */
  async toggleActive(id: string) {
    const prod = await db.query.product.findFirst({ where: eq(product.id, id) })
    if (!prod) {
      throw new Error('Produit introuvable')
    }

    const [updated] = await db
      .update(product)
      .set({
        isActive: !prod.isActive,
        updatedAt: new Date(),
      })
      .where(eq(product.id, id))
      .returning()

    return updated
  }

  /**
   * Update badges for a product
   */
  async updateBadges(productId: string, badgeIds: Array<string>) {
    await db.delete(productBadge).where(eq(productBadge.productId, productId))

    if (badgeIds.length > 0) {
      await db
        .insert(productBadge)
        .values(badgeIds.map((badgeId) => ({ productId, badgeId })))
    }

    const prod = await db.query.product.findFirst({
      where: eq(product.id, productId),
      with: {
        badges: { with: { badge: true } },
      },
    })

    return prod ?? null
  }
}

export const productService = new ProductService()
