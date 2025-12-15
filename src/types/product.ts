import type { BadgeModel, CategoryModel } from '@/lib/schema'

export type ProductWithRelations = {
  id: string
  name: string
  slug: string
  description: string | null
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
  search: string
  categoryIds: Array<string>
  badgeIds: Array<string>
  isActive: 'all' | 'active' | 'inactive'
  isFeatured: 'all' | 'featured' | 'not-featured'
}
