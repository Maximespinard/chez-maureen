import { eq } from 'drizzle-orm'

import type { ProductCreate, ProductUpdate } from '@/schemas'
import { deleteFromR2 } from '@/lib/r2'
import { db } from '@/lib/drizzle'
import { product, productBadge, productCategory } from '@/lib/schema'

export class ProductService {
  /**
   * Format product - Drizzle gère nativement les Decimal, pas besoin de conversion
   */
  private formatProduct(prod: any) {
    return prod
  }

  /**
   * Convert numeric fields to strings for Drizzle decimal columns
   */

  private toDbValues(data: Record<string, any>): Record<string, any> {
    const result = { ...data }
    if (result.price !== undefined) {
      result.price = String(result.price)
    }
    if (
      result.discountPercent !== undefined &&
      result.discountPercent !== null
    ) {
      result.discountPercent = String(result.discountPercent)
    }
    if (result.discountAmount !== undefined && result.discountAmount !== null) {
      result.discountAmount = String(result.discountAmount)
    }
    return result
  }

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

    return products.map((p) => this.formatProduct(p))
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

    return prod ? this.formatProduct(prod) : null
  }

  /**
   * Create product with categories and badges
   */
  async create(data: ProductCreate) {
    const { categoryIds, badgeIds = [], ...productData } = data

    return db.transaction(async (tx) => {
      // Create product
      const [newProduct] = await tx
        .insert(product)
        .values(this.toDbValues(productData) as typeof product.$inferInsert)
        .returning()

      // Create category associations
      if (categoryIds.length > 0) {
        await tx.insert(productCategory).values(
          categoryIds.map((categoryId) => ({
            productId: newProduct.id,
            categoryId,
          })),
        )
      }

      // Create badge associations
      if (badgeIds.length > 0) {
        await tx.insert(productBadge).values(
          badgeIds.map((badgeId) => ({
            productId: newProduct.id,
            badgeId,
          })),
        )
      }

      // Fetch the product with relations
      const prodWithRelations = await tx.query.product.findFirst({
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

      return this.formatProduct(prodWithRelations)
    })
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
      return db.transaction(async (tx) => {
        // Update categories if provided
        if (categoryIds !== undefined) {
          await tx
            .delete(productCategory)
            .where(eq(productCategory.productId, id))

          if (categoryIds.length > 0) {
            await tx.insert(productCategory).values(
              categoryIds.map((categoryId) => ({
                productId: id,
                categoryId,
              })),
            )
          }
        }

        // Update badges if provided
        if (badgeIds !== undefined) {
          await tx.delete(productBadge).where(eq(productBadge.productId, id))

          if (badgeIds.length > 0) {
            await tx.insert(productBadge).values(
              badgeIds.map((badgeId) => ({
                productId: id,
                badgeId,
              })),
            )
          }
        }

        // Update product
        await tx
          .update(product)
          .set(
            this.toDbValues(productData) as Partial<
              typeof product.$inferInsert
            >,
          )
          .where(eq(product.id, id))

        // Fetch updated product with relations
        const updatedProduct = await tx.query.product.findFirst({
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

        return this.formatProduct(updatedProduct)
      })
    }

    // No associations update, just product fields
    await db
      .update(product)
      .set(this.toDbValues(productData) as Partial<typeof product.$inferInsert>)
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

    return this.formatProduct(updatedProduct)
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

    return this.formatProduct(deletedProduct)
  }

  /**
   * Update product categories only
   */
  async updateCategories(productId: string, categoryIds: Array<string>) {
    return db.transaction(async (tx) => {
      await tx
        .delete(productCategory)
        .where(eq(productCategory.productId, productId))

      if (categoryIds.length > 0) {
        await tx.insert(productCategory).values(
          categoryIds.map((categoryId) => ({
            productId,
            categoryId,
          })),
        )
      }

      const prod = await tx.query.product.findFirst({
        where: eq(product.id, productId),
        with: {
          categories: {
            with: {
              category: true,
            },
          },
        },
      })

      return prod ? this.formatProduct(prod) : null
    })
  }

  /**
   * Get featured products ordered by featuredOrder
   */
  async getFeatured() {
    const products = await db.query.product.findMany({
      where: (prod, { eq: equals, and }) =>
        and(equals(prod.isFeatured, true), equals(prod.isActive, true)),
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

    return products.map((p) => this.formatProduct(p))
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
      .set({ isActive: !prod.isActive })
      .where(eq(product.id, id))
      .returning()

    return this.formatProduct(updated)
  }

  /**
   * Update badges for a product
   */
  async updateBadges(productId: string, badgeIds: Array<string>) {
    return db.transaction(async (tx) => {
      await tx.delete(productBadge).where(eq(productBadge.productId, productId))

      if (badgeIds.length > 0) {
        await tx
          .insert(productBadge)
          .values(badgeIds.map((badgeId) => ({ productId, badgeId })))
      }

      const prod = await tx.query.product.findFirst({
        where: eq(product.id, productId),
        with: {
          badges: { with: { badge: true } },
        },
      })

      return prod ? this.formatProduct(prod) : null
    })
  }
}

export const productService = new ProductService()
