import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import {
  account,
  session,
  user,
  interview,
  verification
} from '~~/server/database/schema'
import { useDrizzle } from '~~/server/utils/drizzle'

let _auth: ReturnType<typeof betterAuth>

export function serverAuth() {
  if (!_auth) {
    _auth = betterAuth({
      database: drizzleAdapter(useDrizzle(), {
        provider: 'sqlite',
        schema: {
          account,
          session,
          user,
          interview,
          verification
        }
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
