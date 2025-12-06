import { z } from 'zod'

export const CategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1),
  icon: z.string().optional(),
  order: z.number().int().default(0),
})

export const CategoryCreateSchema = CategorySchema.omit({ id: true })
export const CategoryUpdateSchema = CategorySchema.partial().required({
  id: true,
})

export type Category = z.infer<typeof CategorySchema>
export type CategoryCreate = z.infer<typeof CategoryCreateSchema>
export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>
