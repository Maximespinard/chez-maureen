import type { ProductCreate, ProductUpdate } from '@/schemas'
import { deleteFromR2 } from '@/lib/r2'
import { prisma } from '@/db'

export class ProductService {
  /**
   * Format product to convert Decimal fields to numbers
   */
  private formatProduct(product: any) {
    return {
      ...product,
      price: product.price.toNumber(),
      discountPercent: product.discountPercent?.toNumber() ?? null,
      discountAmount: product.discountAmount?.toNumber() ?? null,
    }
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

    return products.map((p) => this.formatProduct(p))
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

    return product ? this.formatProduct(product) : null
  }

  /**
   * Create product with categories and badges
   */
  async create(data: ProductCreate) {
    const { categoryIds, badgeIds = [], ...productData } = data

    const product = await prisma.product.create({
      data: {
        ...productData,
        categories: {
          create: categoryIds.map((categoryId) => ({
            categoryId,
          })),
        },
        badges: {
          create: badgeIds.map((badgeId) => ({
            badgeId,
          })),
        },
      },
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

    return this.formatProduct(product)
  }

  /**
   * Update product, categories, and badges
   */
  async update(data: ProductUpdate) {
    const { id, categoryIds, badgeIds, ...productData } = data

    // Si nouvelle image fournie, supprimer l'ancienne de R2
    if (productData.imageKey) {
      const existingProduct = await prisma.product.findUnique({
        where: { id },
        select: { imageKey: true },
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
      const product = await prisma.$transaction(async (tx) => {
        // Update categories if provided
        if (categoryIds !== undefined) {
          await tx.productCategory.deleteMany({
            where: { productId: id },
          })

          await tx.productCategory.createMany({
            data: categoryIds.map((categoryId) => ({
              productId: id,
              categoryId,
            })),
          })
        }

        // Update badges if provided
        if (badgeIds !== undefined) {
          await tx.productBadge.deleteMany({
            where: { productId: id },
          })

          await tx.productBadge.createMany({
            data: badgeIds.map((badgeId) => ({
              productId: id,
              badgeId,
            })),
          })
        }

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
            badges: {
              include: {
                badge: true,
              },
            },
          },
        })
      })

      return this.formatProduct(product)
    }

    // No associations update, just product fields
    const product = await prisma.product.update({
      where: { id },
      data: productData,
      include: {
        badges: {
          include: {
            badge: true,
          },
        },
      },
    })

    return this.formatProduct(product)
  }

  /**
   * Delete product (cascade will remove ProductCategory)
   */
  async delete(id: string) {
    // Récupérer imageKey avant suppression
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      select: { imageKey: true },
    })

    // Supprimer le produit de la DB
    const product = await prisma.product.delete({
      where: { id },
    })

    // Supprimer l'image de R2 si elle existe
    if (existingProduct?.imageKey) {
      await deleteFromR2(existingProduct.imageKey)
    }

    return this.formatProduct(product)
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

    return product ? this.formatProduct(product) : null
  }

  /**
   * Get featured products ordered by featuredOrder
   */
  async getFeatured() {
    const products = await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
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
      orderBy: [{ featuredOrder: 'asc' }, { name: 'asc' }],
    })

    return products.map((p) => this.formatProduct(p))
  }

  /**
   * Toggle isActive status
   */
  async toggleActive(id: string) {
    const product = await prisma.product.findUnique({ where: { id } })
    if (!product) {
      throw new Error('Produit introuvable')
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { isActive: !product.isActive },
    })

    return this.formatProduct(updated)
  }

  /**
   * Update badges for a product
   */
  async updateBadges(productId: string, badgeIds: Array<string>) {
    const product = await prisma.$transaction(async (tx) => {
      await tx.productBadge.deleteMany({ where: { productId } })

      await tx.productBadge.createMany({
        data: badgeIds.map((badgeId) => ({ productId, badgeId })),
      })

      return tx.product.findUnique({
        where: { id: productId },
        include: {
          badges: { include: { badge: true } },
        },
      })
    })

    return product ? this.formatProduct(product) : null
  }
}

export const productService = new ProductService()
