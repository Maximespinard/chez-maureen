import type { ProductCreate, ProductUpdate } from '@/schemas'
import { prisma } from '@/db'

export class ProductService {
  /**
   * Get all products with categories
   */
  async getAll() {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
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

    return products.map((p) => ({ ...p, price: p.price.toNumber() }))
  }

  /**
   * Get single product with full relations
   */
  async getById(id: string) {
    const product = await prisma.product.findUnique({
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

    return product ? { ...product, price: product.price.toNumber() } : null
  }

  /**
   * Create product with categories
   */
  async create(data: ProductCreate) {
    const { categoryIds, ...productData } = data

    const product = await prisma.product.create({
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

    return { ...product, price: product.price.toNumber() }
  }

  /**
   * Update product and categories
   */
  async update(data: ProductUpdate) {
    const { id, categoryIds, ...productData } = data

    // If categoryIds provided, update associations
    if (categoryIds) {
      const product = await prisma.$transaction(async (tx) => {
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

      return { ...product, price: product.price.toNumber() }
    }

    // No category update, just product fields
    const product = await prisma.product.update({
      where: { id },
      data: productData,
    })

    return { ...product, price: product.price.toNumber() }
  }

  /**
   * Delete product (cascade will remove ProductCategory)
   */
  async delete(id: string) {
    const product = await prisma.product.delete({
      where: { id },
    })

    return { ...product, price: product.price.toNumber() }
  }

  /**
   * Update product categories only
   */
  async updateCategories(productId: string, categoryIds: Array<string>) {
    const product = await prisma.$transaction(async (tx) => {
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

    return product ? { ...product, price: product.price.toNumber() } : null
  }
}

export const productService = new ProductService()
