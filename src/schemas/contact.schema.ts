import { z } from 'zod'

import { BUSINESS_FIELDS, COMMON_FIELDS } from '@/lib/validation-messages'

export const ContactSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, COMMON_FIELDS.name.required),
  email: z
    .string()
    .email(COMMON_FIELDS.email.invalid)
    .optional()
    .or(z.literal('')),
  phone: z.string().optional(),
  message: z.string().min(10, BUSINESS_FIELDS.contact.messageMinLength),
  isRead: z.boolean().default(false),
})

export const ContactCreateSchema = ContactSchema.omit({
  id: true,
  isRead: true,
})

export type Contact = z.infer<typeof ContactSchema>
export type ContactCreate = z.infer<typeof ContactCreateSchema>
