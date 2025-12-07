import { z } from 'zod'

import {
  BUSINESS_FIELDS,
  COMMON_FIELDS,
  VALIDATION,
} from '@/lib/validation-messages'

export const PRODUCT_UNITS = [
  'kg',
  'pièce',
  'barquette',
  'botte',
  'lot',
  'g',
  '100g',
  '250g',
  '500g',
] as const

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
  unit: z.enum(PRODUCT_UNITS).default('kg'),
  origin: z
    .string()
    .max(100, VALIDATION.string.maxLength('origine', 100))
    .optional(),
  image: z.string().url(COMMON_FIELDS.url.invalid).optional().or(z.literal('')),
  categoryIds: z
    .array(z.string().cuid())
    .min(1, VALIDATION.array.minOne('catégorie')),
  badgeIds: z.array(z.string().cuid()).optional().default([]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  featuredOrder: z
    .number()
    .int(COMMON_FIELDS.order.mustBeInteger)
    .min(0, COMMON_FIELDS.order.mustBePositive)
    .optional(),
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
