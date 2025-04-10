import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import * as schema from '../database/schema'
import { useDrizzle } from './drizzle'

export const auth = betterAuth({
  database: drizzleAdapter(useDrizzle(), {
    provider: 'sqlite',
    schema: { ...schema }
  }),
  emailAndPassword: { enabled: true }
})
