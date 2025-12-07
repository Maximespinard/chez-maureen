import type { CategoryCreate, CategoryReorder, CategoryUpdate } from '@/schemas'
import { prisma } from '@/db'

export class CategoryService {
  /**
   * Get all categories with product counts, ordered by `order` field
   */
  async getAll() {
    return prisma.category.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })
  }

  /**
   * Get single category with products
   */
  async getById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: {
              select: {
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
        _count: {
          select: { products: true },
        },
      },
    })
  }

  /**
   * Create category
   */
  async create(data: CategoryCreate) {
    // Get max order + 1 for new category
    const maxOrder = await prisma.category.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    return prisma.category.create({
      data: {
        ...data,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })
  }

  /**
   * Update category
   */
  async update(data: CategoryUpdate) {
    const { id, ...updateData } = data
    return prisma.category.update({
      where: { id },
      data: updateData,
    })
  }

  /**
   * Delete category (with protection)
   */
  async delete(id: string) {
    // Check if category has products (onDelete: Restrict will also prevent this)
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    if (!category) {
      throw new Error('Catégorie introuvable')
    }

    if (category._count.products > 0) {
      throw new Error(
        `Impossible de supprimer cette catégorie car elle contient ${category._count.products} produit(s). ` +
          `Veuillez d'abord réassigner les produits à une autre catégorie.`,
      )
    }

    return prisma.category.delete({
      where: { id },
    })
  }

  /**
   * Reorder categories (drag & drop)
   */
  async reorder(data: CategoryReorder) {
    // Use transaction to update all at once
    return prisma.$transaction(
      data.categories.map(({ id, order }) =>
        prisma.category.update({
          where: { id },
          data: { order },
        }),
      ),
    )
  }

  /**
   * Add products to category
   */
  async addProducts(categoryId: string, productIds: Array<string>) {
    return await prisma.productCategory.createMany({
      data: productIds.map((productId) => ({
        categoryId,
        productId,
      })),
      skipDuplicates: true, // Prevent errors if already associated
    })
  }

  /**
   * Remove products from category
   */
  async removeProducts(categoryId: string, productIds: Array<string>) {
    return await prisma.productCategory.deleteMany({
      where: {
        categoryId,
        productId: { in: productIds },
      },
    })
  }

  /**
   * Get available products NOT in this category
   */
  async getAvailableProducts(categoryId: string) {
    return prisma.product.findMany({
      where: {
        categories: {
          none: { categoryId },
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        price: true,
        isActive: true,
      },
      orderBy: { name: 'asc' },
    })
  }
}

export const categoryService = new CategoryService()
