import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'

// Load .env.local to match npm scripts behavior
config({ path: '.env.local' })

export default defineConfig({
  schema: './prisma/schema.prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
