import { count, eq } from 'drizzle-orm'

import type { BadgeCreate, BadgeReorder, BadgeUpdate } from '@/schemas'
import { db } from '@/lib/drizzle'
import { badge, productBadge } from '@/lib/schema'

export class BadgeService {
  /**
   * Get all badges with product counts, ordered by `order` field
   */
  async getAll() {
    const badges = await db.query.badge.findMany({
      orderBy: (bdg, { asc }) => [asc(bdg.order)],
    })

    // Get product counts for each badge
    const badgesWithCount = await Promise.all(
      badges.map(async (bdg) => {
        const [productCount] = await db
          .select({ count: count() })
          .from(productBadge)
          .where(eq(productBadge.badgeId, bdg.id))

        return {
          ...bdg,
          _count: {
            products: Number(productCount.count),
          },
        }
      }),
    )

    return badgesWithCount
  }

  /**
   * Get single badge with products
   */
  async getById(id: string) {
    const bdg = await db.query.badge.findFirst({
      where: eq(badge.id, id),
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

    if (!bdg) return null

    // Get product count
    const [productCount] = await db
      .select({ count: count() })
      .from(productBadge)
      .where(eq(productBadge.badgeId, id))

    return {
      ...bdg,
      _count: {
        products: Number(productCount.count),
      },
    }
  }

  /**
   * Create badge with auto-incremented order
   */
  async create(data: BadgeCreate) {
    // Get max order + 1 for new badge
    const maxOrder = await db.query.badge.findFirst({
      orderBy: (bdg, { desc: descending }) => [descending(bdg.order)],
      columns: { order: true },
    })

    const now = new Date()
    const [newBadge] = await db
      .insert(badge)
      .values({
        ...data,
        order: (maxOrder?.order ?? -1) + 1,
        createdAt: now,
        updatedAt: now,
      })
      .returning()

    return newBadge
  }

  /**
   * Update badge
   */
  async update(data: BadgeUpdate) {
    const { id, ...updateData } = data
    const [updatedBadge] = await db
      .update(badge)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(badge.id, id))
      .returning()

    return updatedBadge
  }

  /**
   * Delete badge
   * Note: ProductBadge has onDelete: Cascade, so products will be disassociated automatically
   * But we provide a warning to the user if the badge is in use
   */
  async delete(id: string) {
    const bdg = await db.query.badge.findFirst({
      where: eq(badge.id, id),
    })

    if (!bdg) {
      throw new Error('Badge introuvable')
    }

    // Unlike categories, badges can be deleted even with products (cascade)
    // But we warn the user in the UI
    const [deletedBadge] = await db
      .delete(badge)
      .where(eq(badge.id, id))
      .returning()

    return deletedBadge
  }

  /**
   * Reorder badges (drag & drop)
   */
  async reorder(data: BadgeReorder) {
    const results = []
    for (const { id, order: newOrder } of data.badges) {
      const [updated] = await db
        .update(badge)
        .set({
          order: newOrder,
          updatedAt: new Date(),
        })
        .where(eq(badge.id, id))
        .returning()
      results.push(updated)
    }
    return results
  }
}

export const badgeService = new BadgeService()
