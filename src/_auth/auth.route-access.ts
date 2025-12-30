// auth-session.ts
import { useAuthStore } from "@/_stores/auth.store"
import type { Role } from "./auth.roles"
import { RouteArea } from "./auth.route-areas"
import { ROUTE_ACCESS } from "./auth.route-matix"

export function canAccessArea(area: RouteArea): boolean {
  const allowedRoles = ROUTE_ACCESS[area]
  return authSession.hasAnyRole(allowedRoles)
}

export const authSession = {
  hasAnyRole: (roles: readonly Role[]) =>
    roles.some(r => useAuthStore.getState().userAccount?.roles.includes(r)),

  hasRole: (role: Role) =>
    useAuthStore.getState().userAccount?.roles.includes(role) ?? false,
}
