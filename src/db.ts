import { Pool } from '@neondatabase/serverless'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

// Lazy initialization - Prisma est créé uniquement quand nécessaire
let prismaInstance: PrismaClient | null = null

function getPrismaClient(): PrismaClient {
  if (!prismaInstance) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    })
    prismaInstance = new PrismaClient({ adapter })
  }
  return prismaInstance
}

// Export un Proxy qui retourne toujours le même client
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    return getPrismaClient()[prop as keyof PrismaClient]
  },
})

export const db = prisma // Alias pour compatibilité

// Create a connection pool for raw SQL queries
let pool: Pool | undefined

export async function getClient() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set')
      return undefined
    }

    // Create pool if it doesn't exist
    if (!pool) {
      pool = new Pool({ connectionString: process.env.DATABASE_URL })
      pool.on('error', (err: Error) => console.error('Pool error:', err))
    }

    // Get a client from the pool
    const client = await pool.connect()
    return client
  } catch (error) {
    console.error('Failed to get database client:', error)
    return undefined
  }
}
