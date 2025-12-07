import { z } from 'zod'

import {
  BUSINESS_FIELDS,
  COMMON_FIELDS,
  VALIDATION,
} from '@/lib/validation-messages'

export const ProductSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .min(1, COMMON_FIELDS.name.required)
    .max(200, COMMON_FIELDS.name.maxLength(200)),
  slug: z
    .string()
    .min(1, COMMON_FIELDS.slug.required)
    .max(200, COMMON_FIELDS.slug.maxLength(200))
    .regex(/^[a-z0-9-]+$/, COMMON_FIELDS.slug.invalid),
  description: z
    .string()
    .max(1000, COMMON_FIELDS.description.maxLength(1000))
    .optional(),
  price: z.number().positive(BUSINESS_FIELDS.price.positive),
  unit: z.string().default('kg'),
  origin: z.string().max(100, VALIDATION.string.maxLength('origine', 100)).optional(),
  image: z.string().url(COMMON_FIELDS.url.invalid).optional(),
  categoryIds: z.array(z.string().cuid()).min(1, VALIDATION.array.minOne('catégorie')),
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
