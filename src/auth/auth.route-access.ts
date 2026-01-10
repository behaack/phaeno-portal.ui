// auth-session.ts
import { useAuthStore } from '@/stores/auth.store'
import { getRoleScope, RoleScope } from './auth.role-scope'
import type { Role } from './auth.roles'
import { RouteArea } from './auth.route-areas'
import { ROUTE_ACCESS } from './auth.route-matix'

export function canAccessArea(area: RouteArea): boolean {
  const allowedRoles = ROUTE_ACCESS[area]
  return authSession.hasAnyRole(allowedRoles)
}

export const authSession = {
  hasAnyRole: (roles: readonly Role[]) =>
    roles.some((r) => useAuthStore.getState().userAccount?.roles.includes(r)),

  hasRole: (role: Role) => useAuthStore.getState().userAccount?.roles.includes(role) ?? false,

  hasScope: (scope: RoleScope) =>
    useAuthStore.getState().userAccount?.roles.some((role) => getRoleScope(role) === scope) ??
    false,
}
