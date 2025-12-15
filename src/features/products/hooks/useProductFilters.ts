import { useCallback, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import type { ProductFilters } from '@/types/product'

const DEFAULT_FILTERS: ProductFilters = {
  badgeIds: [],
  categoryIds: [],
  isActive: 'all',
  isFeatured: 'all',
  search: '',
}

export function useProductFilters() {
  const [page, setPage] = useState(1)
  const [filters, setFiltersState] = useState<ProductFilters>(DEFAULT_FILTERS)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search to avoid too many server requests
  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value)
    setPage(1) // Reset to page 1 on search
  }, 300)

  const setFilters = useCallback(
    (newFilters: ProductFilters) => {
      setFiltersState(newFilters)
      // Handle search debouncing
      if (newFilters.search !== filters.search) {
        debouncedSetSearch(newFilters.search)
      } else {
        setPage(1) // Reset page on filter change
      }
    },
    [debouncedSetSearch, filters.search],
  )

  const clearFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS)
    setDebouncedSearch('')
    setPage(1)
  }, [])

  // Build query for server
  const query = {
    badgeIds: filters.badgeIds,
    categoryIds: filters.categoryIds,
    isActive: filters.isActive,
    isFeatured: filters.isFeatured,
    page,
    pageSize: 12,
    search: debouncedSearch,
  }

  return {
    clearFilters,
    filters,
    page,
    query,
    setFilters,
    setPage,
  }
}
