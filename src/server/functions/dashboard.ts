import { count, desc, eq } from 'drizzle-orm'
import { createServerFn } from '@tanstack/react-start'

import { db } from '@/lib/drizzle'
import { badge, category, contactMessage, product } from '@/lib/schema'

export const getDashboardStats = createServerFn({ method: 'GET' }).handler(
  async () => {
    // Execute queries in parallel (no transaction needed for read-only)
    const [
      productsCount,
      categoriesCount,
      badgesCount,
      unreadMessagesCount,
      recentProducts,
    ] = await Promise.all([
      // Count total products
      db.select({ count: count() }).from(product),

      // Count total categories
      db.select({ count: count() }).from(category),

      // Count total badges
      db.select({ count: count() }).from(badge),

      // Count unread messages
      db
        .select({ count: count() })
        .from(contactMessage)
        .where(eq(contactMessage.isRead, false)),

      // Get 5 most recent products with categories
      db.query.product.findMany({
        limit: 5,
        orderBy: [desc(product.createdAt)],
        with: {
          categories: {
            with: {
              category: {
                columns: { id: true, name: true, slug: true },
              },
            },
          },
        },
      }),
    ])

    return {
      stats: {
        productsCount: productsCount[0].count,
        categoriesCount: categoriesCount[0].count,
        badgesCount: badgesCount[0].count,
        unreadMessagesCount: unreadMessagesCount[0].count,
      },
      recentProducts,
    }
  },
)
