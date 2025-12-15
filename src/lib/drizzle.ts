import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

let drizzleInstance: ReturnType<typeof drizzle<typeof schema>> | null = null

export function getDrizzle() {
  if (!drizzleInstance) {
    const sql = neon(process.env.DATABASE_URL!)
    drizzleInstance = drizzle(sql, { schema })
  }
  return drizzleInstance
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_, prop) {
    return getDrizzle()[prop as keyof ReturnType<typeof drizzle<typeof schema>>]
  },
})
