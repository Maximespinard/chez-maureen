import { z } from 'zod'

export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(12),
})

export const ProductFiltersSchema = z.object({
  badgeIds: z.array(z.string().uuid()).optional().default([]),
  categoryIds: z.array(z.string().uuid()).optional().default([]),
  isActive: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  isFeatured: z
    .enum(['all', 'featured', 'not-featured'])
    .optional()
    .default('all'),
  search: z.string().optional().default(''),
})

export const ProductQuerySchema = PaginationSchema.merge(ProductFiltersSchema)

export type Pagination = z.infer<typeof PaginationSchema>
export type ProductFiltersInput = z.infer<typeof ProductFiltersSchema>
export type ProductQuery = z.infer<typeof ProductQuerySchema>
