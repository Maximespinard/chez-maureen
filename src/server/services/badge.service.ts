import type { BadgeCreate, BadgeReorder, BadgeUpdate } from '@/schemas'
import { prisma } from '@/db'

export class BadgeService {
  /**
   * Get all badges with product counts, ordered by `order` field
   */
  async getAll() {
    return prisma.badge.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { order: 'asc' },
    })
  }

  /**
   * Get single badge with products
   */
  async getById(id: string) {
    return prisma.badge.findUnique({
      include: {
        _count: {
          select: { products: true },
        },
        products: {
          include: {
            product: {
              select: {
                id: true,
                image: true,
                isActive: true,
                name: true,
                price: true,
                slug: true,
              },
            },
          },
        },
      },
      where: { id },
    })
  }

  /**
   * Create badge with auto-incremented order
   */
  async create(data: BadgeCreate) {
    // Get max order + 1 for new badge
    const maxOrder = await prisma.badge.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    return prisma.badge.create({
      data: {
        ...data,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })
  }

  /**
   * Update badge
   */
  async update(data: BadgeUpdate) {
    const { id, ...updateData } = data
    return prisma.badge.update({
      data: updateData,
      where: { id },
    })
  }

  /**
   * Delete badge
   * Note: ProductBadge has onDelete: Cascade, so products will be disassociated automatically
   * But we provide a warning to the user if the badge is in use
   */
  async delete(id: string) {
    const badge = await prisma.badge.findUnique({
      include: {
        _count: {
          select: { products: true },
        },
      },
      where: { id },
    })

    if (!badge) {
      throw new Error('Badge introuvable')
    }

    // Unlike categories, badges can be deleted even with products (cascade)
    // But we warn the user in the UI
    return prisma.badge.delete({
      where: { id },
    })
  }

  /**
   * Reorder badges (drag & drop)
   */
  async reorder(data: BadgeReorder) {
    return prisma.$transaction(
      data.badges.map(({ id, order }) =>
        prisma.badge.update({
          data: { order },
          where: { id },
        }),
      ),
    )
  }
}

export const badgeService = new BadgeService()
