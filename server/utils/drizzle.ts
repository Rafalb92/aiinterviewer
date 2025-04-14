import { drizzle } from 'drizzle-orm/d1'
import {
  account,
  session,
  user,
  interview,
  verification
} from '~~/server/database/schema'

export function useDrizzle() {
  return drizzle(hubDatabase(), {
    schema: {
      account,
      session,
      user,
      interview,
      verification
    }
  })
}
