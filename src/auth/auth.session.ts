import type { NavigateFn } from '@tanstack/react-router'
import { EOrganizationType } from '@/api/types/enums'
import { useAuthStore } from '@/stores/auth.store'
import { getRoleScope, RoleScope } from './auth.role-scope'
import { Role } from './auth.roles'

export const authSession = {
  // 🔐 tokens
  getAccessToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,

  // 👤 identity
  getUser: () => useAuthStore.getState().userAccount,
  getRoles: () => useAuthStore.getState().userAccount?.roles ?? [],
  isCustomer: () => getOrgType() === EOrganizationType.Customer,
  isPhaeno: () => getOrgType() === EOrganizationType.Phaeno,
  isPartner: () => getOrgType() === EOrganizationType.Partner,

  // 🧠 auth state
  hasHydrated: () => useAuthStore.getState().hasHydrated,

  isAuthenticated: () => {
    const s = useAuthStore.getState()
    return s.isAuthenticated()
  },

  // 🧱 RBAC helpers
  hasRole: (role: Role) => useAuthStore.getState().userAccount?.roles.includes(role) ?? false,

  hasAnyRole: (roles: Role[]) =>
    roles.some((r) => useAuthStore.getState().userAccount?.roles.includes(r)),

  hasScope: (scope: RoleScope) =>
    useAuthStore.getState().userAccount?.roles.some((role) => getRoleScope(role) === scope) ??
    false,

  // 🔄 lifecycle
  login: (accessToken: string, refreshToken: string, expiresInSeconds: number) =>
    useAuthStore.getState().login(accessToken, refreshToken, expiresInSeconds),

  rotateTokens: (accessToken: string, refreshToken: string, expiresInSeconds: number) =>
    useAuthStore.getState().rotateTokens(accessToken, refreshToken, expiresInSeconds),

  logout: async (navigate?: NavigateFn) => {
    useAuthStore.getState().logout()
  },
}

const getOrgType = () => useAuthStore.getState().userAccount?.organizationType
