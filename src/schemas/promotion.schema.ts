import { z } from 'zod'

export const PromotionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  discountAmount: z.number().positive().optional(),
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
