import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import * as authSchema from './auth-schema'
import { db } from './drizzle'

// Lazy initialization pour Cloudflare Workers
// Les variables d'environnement ne sont pas disponibles au chargement du module
let authInstance: ReturnType<typeof betterAuth> | null = null

function getAuth() {
  if (!authInstance) {
    console.log('[Auth Debug] process.env.BETTER_AUTH_SECRET:', process.env.BETTER_AUTH_SECRET ? 'SET' : 'UNDEFINED')
    authInstance = betterAuth({
      secret: process.env.BETTER_AUTH_SECRET,
      baseURL: process.env.BETTER_AUTH_URL,
      database: drizzleAdapter(db, {
        provider: 'pg',
        schema: authSchema,
      }),
      emailAndPassword: {
        enabled: true,
      },
      session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 jours
        updateAge: 60 * 60 * 24, // Mettre à jour la session tous les jours
      },
      plugins: [
        username(),
        tanstackStartCookies(), // DOIT être le dernier plugin
      ],
    })
  }
  return authInstance
}

// Proxy pour accès transparent
export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
  get(_, prop) {
    return getAuth()[prop as keyof ReturnType<typeof betterAuth>]
  },
})

export type Session = ReturnType<typeof betterAuth>['$Infer']['Session']
