import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  slug: z
    .string()
    .min(1, 'Le slug est requis')
    .max(100, 'Le slug ne peut pas dépasser 100 caractères')
    .regex(/^[a-z0-9-]+$/, 'Slug invalide'),
  order: z.number().int().min(0).default(0),
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
      order: z.number().int().min(0),
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
