import { serverAuth } from '../utils/auth'

export default defineEventHandler((event) => {
  return serverAuth().handler(toWebRequest(event))
})
