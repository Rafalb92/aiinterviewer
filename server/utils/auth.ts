import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import * as schema from '../database/schema'
import { useDrizzle } from './drizzle'

let _auth: ReturnType<typeof betterAuth>

export function serverAuth() {
  if (!_auth) {
    _auth = betterAuth({
      database: drizzleAdapter(useDrizzle(), {
        provider: 'sqlite',
        schema: { ...schema }
      }),
      emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        minPasswordLength: 8
      }
    })
  }
  return _auth
}
