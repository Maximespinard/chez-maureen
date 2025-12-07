import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, 'Le nom est requis').max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug invalide'),
  description: z.string().max(1000).optional(),
  price: z.number().positive('Le prix doit être positif'),
  unit: z.string().default('kg'),
  origin: z.string().max(100).optional(),
  image: z.string().url('URL invalide').optional(),
  categoryIds: z
    .array(z.string().cuid())
    .min(1, 'Au moins une catégorie requise'),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

export const ProductCreateSchema = ProductSchema.omit({ id: true })

export const ProductUpdateSchema = ProductSchema.partial().required({
  id: true,
})

// For managing category associations
export const ProductCategoryAssociationSchema = z.object({
  productId: z.string().cuid(),
  categoryIds: z.array(z.string().cuid()),
})

export type Product = z.infer<typeof ProductSchema>
export type ProductCreate = z.infer<typeof ProductCreateSchema>
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>
export type ProductCategoryAssociation = z.infer<
  typeof ProductCategoryAssociationSchema
>
