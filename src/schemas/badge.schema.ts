import { z } from 'zod'

export const BadgeSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .max(50, 'Le nom ne peut pas depasser 50 caracteres'),
  slug: z
    .string()
    .min(1, 'Le slug est requis')
    .max(50, 'Le slug ne peut pas depasser 50 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug invalide (lettres minuscules, chiffres et tirets uniquement)'),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur hex invalide (format: #RRGGBB)'),
  order: z.number().int().min(0).default(0),
})

export const BadgeCreateSchema = BadgeSchema.omit({ id: true })

export const BadgeUpdateSchema = BadgeSchema.partial().required({
  id: true,
})

export const BadgeReorderSchema = z.object({
  badges: z.array(
    z.object({
      id: z.string().cuid(),
      order: z.number().int().min(0),
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
