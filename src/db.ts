import { Pool } from '@neondatabase/serverless'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/prisma/client.js'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

declare global {
  var __prisma: PrismaClient | undefined
}

export const prisma = globalThis.__prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}

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
