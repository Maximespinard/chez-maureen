import { useMemo, useState } from 'react'

import type { ProductFilters, ProductWithRelations } from '@/types/product'

export function useProductFilters(
  products: Array<ProductWithRelations> | undefined,
) {
  const [filters, setFilters] = useState<ProductFilters>({
    badgeIds: [],
    categoryIds: [],
    isActive: 'all',
    isFeatured: 'all',
    search: '',
  })

  const filteredProducts = useMemo(() => {
    if (!products) return []

    return products.filter((product) => {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase()
        const matchesName = product.name.toLowerCase().includes(search)
        const matchesOrigin =
          product.origin?.toLowerCase().includes(search) || false
        if (!matchesName && !matchesOrigin) {
          return false
        }
      }

      // Category filter
      if (filters.categoryIds.length > 0) {
        const productCategoryIds = product.categories.map((c) => c.category.id)
        const hasCategory = filters.categoryIds.some((id) =>
          productCategoryIds.includes(id),
        )
        if (!hasCategory) {
          return false
        }
      }

      // Badge filter
      if (filters.badgeIds.length > 0) {
        const productBadgeIds = product.badges.map((b) => b.badge.id)
        const hasBadge = filters.badgeIds.some((id) =>
          productBadgeIds.includes(id),
        )
        if (!hasBadge) {
          return false
        }
      }

      // Active status filter
      if (filters.isActive !== 'all') {
        if (filters.isActive === 'active' && !product.isActive) return false
        if (filters.isActive === 'inactive' && product.isActive) return false
      }

      // Featured status filter
      if (filters.isFeatured !== 'all') {
        if (filters.isFeatured === 'featured' && !product.isFeatured)
          return false
        if (filters.isFeatured === 'not-featured' && product.isFeatured)
          return false
      }

      return true
    })
  }, [products, filters])

  const clearFilters = () => {
    setFilters({
      badgeIds: [],
      categoryIds: [],
      isActive: 'all',
      isFeatured: 'all',
      search: '',
    })
  }

  return { clearFilters, filteredProducts, filters, setFilters }
}
