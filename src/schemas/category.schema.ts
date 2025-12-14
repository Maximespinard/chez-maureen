import { z } from 'zod'

import { COMMON_FIELDS } from '@/lib/validation-messages'

export const CategorySchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .min(1, COMMON_FIELDS.name.required)
    .max(100, COMMON_FIELDS.name.maxLength(100)),
  slug: z
    .string()
    .min(1, COMMON_FIELDS.slug.required)
    .max(100, COMMON_FIELDS.slug.maxLength(100))
    .regex(/^[a-z0-9-]+$/, COMMON_FIELDS.slug.invalid),
  order: z
    .number()
    .int(COMMON_FIELDS.order.mustBeInteger)
    .min(0, COMMON_FIELDS.order.mustBePositive)
    .default(0),
})

export const CategoryCreateSchema = CategorySchema.omit({ id: true })

export const CategoryUpdateSchema = CategorySchema.partial().required({
  id: true,
})

// For reordering multiple categories
export const CategoryReorderSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string().cuid(),
      order: z
        .number()
        .int(COMMON_FIELDS.order.mustBeInteger)
        .min(0, COMMON_FIELDS.order.mustBePositive),
    }),
  ),
})

// For checking delete safety
export const CategoryDeleteSchema = z.object({
  id: z.string().cuid(),
  force: z.boolean().default(false), // Future: allow force delete with reassignment
})

export type Category = z.infer<typeof CategorySchema>
export type CategoryCreate = z.infer<typeof CategoryCreateSchema>
export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>
export type CategoryReorder = z.infer<typeof CategoryReorderSchema>
export type CategoryDelete = z.infer<typeof CategoryDeleteSchema>
