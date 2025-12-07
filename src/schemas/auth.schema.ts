import { z } from 'zod'

import { VALIDATION } from '@/lib/validation-messages'

// Schéma pour login avec username (admin)
export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, VALIDATION.string.minLength("nom d'utilisateur", 3)),
  password: z
    .string()
    .min(8, VALIDATION.string.minLength('mot de passe', 8)),
})

// Schéma pour login avec email (optionnel, pour futur usage)
export const EmailLoginSchema = z.object({
  email: z.string().email(VALIDATION.string.email),
  password: z.string().min(8, VALIDATION.string.minLength('mot de passe', 8)),
})

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, VALIDATION.string.minLength("nom d'utilisateur", 3)),
    email: z.string().email(VALIDATION.string.email),
    name: z.string().min(1, VALIDATION.string.required('nom')),
    password: z.string().min(8, VALIDATION.string.minLength('mot de passe', 8)),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION.custom.passwordMatch,
    path: ['confirmPassword'],
  })

export type Login = z.infer<typeof LoginSchema>
export type EmailLogin = z.infer<typeof EmailLoginSchema>
export type Register = z.infer<typeof RegisterSchema>
