import { authClient } from '~/lib/auth-client'

export default defineNuxtRouteMiddleware(async (to) => {
  const isLoggedIn = useAuthStatus()
  const protectedRoutes = ['/dashboard', 'interviews/new']
  const authRoutes = ['/sign-in', '/sign-up']
  const { data: session } = await authClient.useSession(useFetch)
  if (!session.value) {
    isLoggedIn.value = false
    if (protectedRoutes.includes(to.path)) {
      return navigateTo('/sign-in')
    }
  }
  if (session.value) {
    isLoggedIn.value = true
    if (authRoutes.includes(to.path)) {
      return navigateTo('/dashboard')
    }
  }
})
