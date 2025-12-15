// Rétro-compatibilité : re-export db depuis drizzle
export { db } from '@/lib/drizzle'

// Alias pour migration progressive - prisma n'est plus utilisé
export const prisma = undefined as never
