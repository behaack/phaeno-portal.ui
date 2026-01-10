import type { Role } from './auth.roles'
import { authSession } from './auth.session'

// USAGE:
// roleUtils.has(ROLES.PHAENO_ADMIN)
// roleUtils.hasAny(ROLES.PHAENO_ADMIN, ROLES.CUSTOMER_ADMIN)

export const roleUtils = {
  has(role: Role): boolean {
    return authSession.hasRole(role)
  },

  hasAny(...roles: Role[]): boolean {
    return authSession.hasAnyRole(roles)
  },

  hasAll(...roles: Role[]): boolean {
    return roles.every((r) => authSession.hasRole(r))
  },
}
