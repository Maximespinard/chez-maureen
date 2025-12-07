import type { ProductCreate, ProductUpdate } from '@/schemas'
import { prisma } from '@/db'

export class ProductService {
  /**
   * Get all products with categories
   */
  async getAll() {
    return prisma.product.findMany({
      include: {
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
                icon: true,
              },
            },
          },
        },
        badges: {
          include: {
            badge: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Get single product with full relations
   */
  async getById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        badges: {
          include: {
            badge: true,
          },
        },
      },
    })
  }

  /**
   * Create product with categories
   */
  async create(data: ProductCreate) {
    const { categoryIds, ...productData } = data

    return prisma.product.create({
      data: {
        ...productData,
        categories: {
          create: categoryIds.map((categoryId) => ({
            categoryId,
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    })
  }

  /**
   * Update product and categories
   */
  async update(data: ProductUpdate) {
    const { id, categoryIds, ...productData } = data

    // If categoryIds provided, update associations
    if (categoryIds) {
      return prisma.$transaction(async (tx) => {
        // Delete existing associations
        await tx.productCategory.deleteMany({
          where: { productId: id },
        })

        // Create new associations
        await tx.productCategory.createMany({
          data: categoryIds.map((categoryId) => ({
            productId: id,
            categoryId,
          })),
        })

        // Update product
        return tx.product.update({
          where: { id },
          data: productData,
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        })
      })
    }

    // No category update, just product fields
    return prisma.product.update({
      where: { id },
      data: productData,
    })
  }

  /**
   * Delete product (cascade will remove ProductCategory)
   */
  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    })
  }

  /**
   * Update product categories only
   */
  async updateCategories(productId: string, categoryIds: Array<string>) {
    return prisma.$transaction(async (tx) => {
      await tx.productCategory.deleteMany({
        where: { productId },
      })

      await tx.productCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          productId,
          categoryId,
        })),
      })

      return tx.product.findUnique({
        where: { id: productId },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
        },
      })
    })
  }
}

export const productService = new ProductService()
