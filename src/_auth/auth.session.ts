import { useAuthStore } from "@/_stores/auth.store"
import type { NavigateFn } from "@tanstack/react-router"

export const authSession = {
  // 🔐 tokens
  getAccessToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,

  // 👤 identity
  getUser: () => useAuthStore.getState().userAccount,
  getRoles: () => useAuthStore.getState().userAccount?.roles ?? [],

  // 🧠 auth state
  hasHydrated: () => useAuthStore.getState().hasHydrated,

  isAuthenticated: () => {
    const s = useAuthStore.getState()
    return s.isAuthenticated()
  },

  isLogoutPending: () => {
    const s = useAuthStore.getState()
    return s.logoutPending
  },

  // 🧱 RBAC helpers
  hasRole: (role: string) =>
    useAuthStore.getState().userAccount?.roles.includes(role) ?? false,

  hasAnyRole: (roles: string[]) =>
    roles.some(r => useAuthStore.getState().userAccount?.roles.includes(r)),

  // 🔄 lifecycle
  login: (accessToken: string, refreshToken: string, expiresInSeconds: number) =>
    useAuthStore.getState().login(accessToken, refreshToken, expiresInSeconds),

  rotateTokens: (accessToken: string, refreshToken: string, expiresInSeconds: number) =>
    useAuthStore.getState().rotateTokens(accessToken, refreshToken, expiresInSeconds),

  logout: async (navigate?: NavigateFn) => {
    useAuthStore.getState().logout()
  }
}
