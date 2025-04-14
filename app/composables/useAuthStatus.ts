export const useAuthStatus = () => useState<boolean>('isLoggedIn', () => false)
