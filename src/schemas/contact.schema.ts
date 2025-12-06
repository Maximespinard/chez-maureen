import { z } from 'zod'

export const ContactSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères'),
  isRead: z.boolean().default(false),
})

export const ContactCreateSchema = ContactSchema.omit({
  id: true,
  isRead: true,
})

export type Contact = z.infer<typeof ContactSchema>
export type ContactCreate = z.infer<typeof ContactCreateSchema>
