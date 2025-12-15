import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

// Lazy initialization - Prisma est créé uniquement quand nécessaire
let prismaInstance: PrismaClient | null = null

function getPrismaClient(): PrismaClient {
  if (!prismaInstance) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    const adapter = new PrismaPg({ connectionString })
    prismaInstance = new PrismaClient({ adapter })
  }
  return prismaInstance
}

// Export un Proxy qui retourne toujours le même client (lazy initialization)
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return getPrismaClient()[prop as keyof PrismaClient]
  },
})

export const db = prisma // Alias pour compatibilité

// Export getClient pour compatibilité (si utilisé ailleurs)
export const getClient = async () => {
  console.warn('getClient() is deprecated with PrismaNeon adapter')
  return undefined
}
