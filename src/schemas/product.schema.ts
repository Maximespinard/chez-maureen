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

export const ProductSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z
      .string()
      .min(1, COMMON_FIELDS.name.required)
      .max(200, COMMON_FIELDS.name.maxLength(200)),
    slug: z
      .string()
      .min(1, COMMON_FIELDS.slug.required)
      .max(200, COMMON_FIELDS.slug.maxLength(200))
      .regex(/^[a-z0-9-]+$/, COMMON_FIELDS.slug.invalid),
    price: z.number().positive(BUSINESS_FIELDS.price.positive),
    unit: z.enum(PRODUCT_UNITS).default('kg'),
    origin: z
      .string()
      .max(100, VALIDATION.string.maxLength('origine', 100))
      .optional(),
    image: z
      .string()
      .url(COMMON_FIELDS.url.invalid)
      .optional()
      .or(z.literal('')),
    imageKey: z.string().optional(),
    categoryIds: z
      .array(z.string().uuid())
      .min(1, VALIDATION.array.minOne('catégorie')),
    badgeIds: z.array(z.string().uuid()).optional().default([]),
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    featuredOrder: z
      .number()
      .int(COMMON_FIELDS.order.mustBeInteger)
      .min(0, COMMON_FIELDS.order.mustBePositive)
      .optional(),
    discountPercent: z
      .number()
      .min(0, BUSINESS_FIELDS.discount.min)
      .max(100, BUSINESS_FIELDS.discount.max)
      .optional()
      .nullable(),
    discountAmount: z
      .number()
      .positive(BUSINESS_FIELDS.discount.amountPositive)
      .optional()
      .nullable(),
  })
  .superRefine((data, ctx) => {
    // Validate que les deux champs de réduction ne sont pas remplis en même temps
    if (
      data.discountPercent !== null &&
      data.discountPercent !== undefined &&
      data.discountAmount !== null &&
      data.discountAmount !== undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Vous ne pouvez pas avoir à la fois une réduction en pourcentage et un montant fixe',
        path: ['discountPercent'],
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Vous ne pouvez pas avoir à la fois une réduction en pourcentage et un montant fixe',
        path: ['discountAmount'],
      })
    }
  })

export const ProductCreateSchema = ProductSchema.omit({ id: true })

export const ProductUpdateSchema = ProductSchema.partial().required({
  id: true,
})

// For managing category associations
export const ProductCategoryAssociationSchema = z.object({
  productId: z.string().uuid(),
  categoryIds: z.array(z.string().uuid()),
})

export type Product = z.infer<typeof ProductSchema>
export type ProductCreate = z.infer<typeof ProductCreateSchema>
export type ProductUpdate = z.infer<typeof ProductUpdateSchema>
export type ProductCategoryAssociation = z.infer<
  typeof ProductCategoryAssociationSchema
>
