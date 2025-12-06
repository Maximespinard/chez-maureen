import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive('Le prix doit être positif'),
  unit: z.string().optional(),
  origin: z.string().optional(),
  image: z.string().url().optional(),
  categoryId: z.string().uuid(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

export const ProductCreateSchema = ProductSchema.omit({ id: true })
export const ProductUpdateSchema = ProductSchema.partial().required({
  id: true,
})

export type Product = z.infer<typeof ProductSchema>
export type ProductCreate = z.infer<typeof ProductCreateSchema>
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>
