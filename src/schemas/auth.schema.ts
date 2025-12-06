import { z } from 'zod'

// Schéma pour login avec username (admin)
export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

// Schéma pour login avec email (optionnel, pour futur usage)
export const EmailLoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
    email: z.string().email('Email invalide'),
    name: z.string().min(1, 'Le nom est requis'),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export type Login = z.infer<typeof LoginSchema>
export type EmailLogin = z.infer<typeof EmailLoginSchema>
export type Register = z.infer<typeof RegisterSchema>
