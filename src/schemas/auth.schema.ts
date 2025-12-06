import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(1, 'Le nom est requis'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export type Login = z.infer<typeof LoginSchema>
export type Register = z.infer<typeof RegisterSchema>
