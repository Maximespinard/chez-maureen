import { count, eq, notInArray, sql } from 'drizzle-orm'

import type { CategoryCreate, CategoryReorder, CategoryUpdate } from '@/schemas'
import { db } from '@/lib/drizzle'
import { category, product, productCategory } from '@/lib/schema'

export class CategoryService {
  /**
   * Get all categories with product counts, ordered by `order` field
   */
  async getAll() {
    const categories = await db.query.category.findMany({
      orderBy: (cat, { asc }) => [asc(cat.order)],
    })

    // Get product counts for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const [productCount] = await db
          .select({ count: count() })
          .from(productCategory)
          .where(eq(productCategory.categoryId, cat.id))

        return {
          ...cat,
          _count: {
            products: Number(productCount.count),
          },
        }
      }),
    )

    return categoriesWithCount
  }

  /**
   * Get single category with products
   */
  async getById(id: string) {
    const cat = await db.query.category.findFirst({
      where: eq(category.id, id),
      with: {
        products: {
          with: {
            product: {
              columns: {
                id: true,
                name: true,
                slug: true,
                image: true,
                price: true,
                isActive: true,
              },
            },
          },
        },
      },
    })

    if (!cat) return null

    // Get product count
    const [productCount] = await db
      .select({ count: count() })
      .from(productCategory)
      .where(eq(productCategory.categoryId, id))

    return {
      ...cat,
      _count: {
        products: Number(productCount.count),
      },
    }
  }

  /**
   * Create category
   */
  async create(data: CategoryCreate) {
    // Get max order + 1 for new category
    const maxOrder = await db.query.category.findFirst({
      orderBy: (cat, { desc: descending }) => [descending(cat.order)],
      columns: { order: true },
    })

    const [newCategory] = await db
      .insert(category)
      .values({
        ...data,
        order: (maxOrder?.order ?? -1) + 1,
      })
      .returning()

    return newCategory
  }

  /**
   * Update category
   */
  async update(data: CategoryUpdate) {
    const { id, ...updateData } = data
    const [updatedCategory] = await db
      .update(category)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(category.id, id))
      .returning()

    return updatedCategory
  }

  /**
   * Delete category (with protection)
   */
  async delete(id: string) {
    // Check if category has products (onDelete: Restrict will also prevent this)
    const cat = await db.query.category.findFirst({
      where: eq(category.id, id),
    })

    if (!cat) {
      throw new Error('Catégorie introuvable')
    }

    // Count products
    const [productCount] = await db
      .select({ count: count() })
      .from(productCategory)
      .where(eq(productCategory.categoryId, id))

    const productsCount = Number(productCount.count)
    if (productsCount > 0) {
      throw new Error(
        `Impossible de supprimer cette catégorie car elle contient ${productsCount} produit(s). ` +
          `Veuillez d'abord réassigner les produits à une autre catégorie.`,
      )
    }

    const [deletedCategory] = await db
      .delete(category)
      .where(eq(category.id, id))
      .returning()

    return deletedCategory
  }

  /**
   * Reorder categories (drag & drop)
   */
  async reorder(data: CategoryReorder) {
    // Use transaction to update all at once
    return db.transaction(async (tx) => {
      const results = []
      for (const { id, order: newOrder } of data.categories) {
        const [updated] = await tx
          .update(category)
          .set({
            order: newOrder,
            updatedAt: new Date(),
          })
          .where(eq(category.id, id))
          .returning()
        results.push(updated)
      }
      return results
    })
  }

  /**
   * Add products to category
   */
  async addProducts(categoryId: string, productIds: Array<string>) {
    return await db
      .insert(productCategory)
      .values(
        productIds.map((productId) => ({
          categoryId,
          productId,
        })),
      )
      .onConflictDoNothing()
  }

  /**
   * Remove products from category
   */
  async removeProducts(categoryId: string, productIds: Array<string>) {
    return await db
      .delete(productCategory)
      .where(
        sql`${productCategory.categoryId} = ${categoryId} AND ${productCategory.productId} = ANY(${productIds})`,
      )
  }

  /**
   * Get available products NOT in this category
   */
  async getAvailableProducts(categoryId: string) {
    // Get products already in this category
    const productsInCategory = await db
      .select({ productId: productCategory.productId })
      .from(productCategory)
      .where(eq(productCategory.categoryId, categoryId))

    const productIdsInCategory = productsInCategory.map((p) => p.productId)

    // Get all products NOT in this category
    const products = await db.query.product.findMany({
      where:
        productIdsInCategory.length > 0
          ? notInArray(product.id, productIdsInCategory)
          : undefined,
      columns: {
        id: true,
        name: true,
        slug: true,
        image: true,
        price: true,
        isActive: true,
      },
      orderBy: (prod, { asc }) => [asc(prod.name)],
    })

    return products
  }
}

export const categoryService = new CategoryService()
