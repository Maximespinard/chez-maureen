import type { BadgeModel, CategoryModel } from '@/lib/schema'

export type ProductWithRelations = {
  id: string
  name: string
  slug: string
  price: number // Converted from Decimal
  unit: string
  origin: string | null
  image: string | null
  imageKey: string | null
  isActive: boolean
  isFeatured: boolean
  featuredOrder: number | null
  discountPercent: number | null
  discountAmount: number | null
  createdAt: Date
  updatedAt: Date
  categories: Array<{
    category: Pick<CategoryModel, 'id' | 'name' | 'slug'>
  }>
  badges: Array<{
    badge: BadgeModel
    value: string | null
  }>
}

export type ProductFilters = {
  badgeIds: Array<string>
  categoryIds: Array<string>
  isActive: 'all' | 'active' | 'inactive'
  isFeatured: 'all' | 'featured' | 'not-featured'
  search: string
}

export type PaginatedProducts = {
  items: Array<ProductWithRelations>
  page: number
  pageSize: number
  total: number
  totalPages: number
}
