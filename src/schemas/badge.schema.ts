import { z } from 'zod'

import { COMMON_FIELDS, VALIDATION } from '@/lib/validation-messages'

export const BadgeSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .min(1, COMMON_FIELDS.name.required)
    .max(50, COMMON_FIELDS.name.maxLength(50)),
  slug: z
    .string()
    .min(1, COMMON_FIELDS.slug.required)
    .max(50, COMMON_FIELDS.slug.maxLength(50))
    .regex(/^[a-z0-9-]+$/, COMMON_FIELDS.slug.invalid),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, VALIDATION.custom.hexColor),
  order: z
    .number()
    .int(COMMON_FIELDS.order.mustBeInteger)
    .min(0, COMMON_FIELDS.order.mustBePositive)
    .default(0),
})

export const BadgeCreateSchema = BadgeSchema.omit({ id: true })

export const BadgeUpdateSchema = BadgeSchema.partial().required({
  id: true,
})

export const BadgeReorderSchema = z.object({
  badges: z.array(
    z.object({
      id: z.string().cuid(),
      order: z
        .number()
        .int(COMMON_FIELDS.order.mustBeInteger)
        .min(0, COMMON_FIELDS.order.mustBePositive),
    }),
  ),
})

export const BadgeDeleteSchema = z.object({
  id: z.string().cuid(),
})

export type Badge = z.infer<typeof BadgeSchema>
export type BadgeCreate = z.infer<typeof BadgeCreateSchema>
export type BadgeUpdate = z.infer<typeof BadgeUpdateSchema>
export type BadgeReorder = z.infer<typeof BadgeReorderSchema>
export type BadgeDelete = z.infer<typeof BadgeDeleteSchema>
