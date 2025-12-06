import { z } from 'zod'

export const BadgeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  slug: z.string().min(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur hex invalide'),
})

export type Badge = z.infer<typeof BadgeSchema>
