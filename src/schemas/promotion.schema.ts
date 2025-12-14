import { z } from 'zod'

import { BUSINESS_FIELDS, COMMON_FIELDS } from '@/lib/validation-messages'

export const PromotionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, COMMON_FIELDS.name.required),
  description: z.string().optional(),
  discountPercent: z
    .number()
    .min(0, BUSINESS_FIELDS.discount.min)
    .max(100, BUSINESS_FIELDS.discount.max)
    .optional(),
  discountAmount: z
    .number()
    .positive(BUSINESS_FIELDS.discount.amountPositive)
    .optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isActive: z.boolean().default(true),
})

export const PromotionCreateSchema = PromotionSchema.omit({ id: true })
export const PromotionUpdateSchema = PromotionSchema.partial().required({
  id: true,
})

export type Promotion = z.infer<typeof PromotionSchema>
export type PromotionCreate = z.infer<typeof PromotionCreateSchema>
export type PromotionUpdate = z.infer<typeof PromotionUpdateSchema>
