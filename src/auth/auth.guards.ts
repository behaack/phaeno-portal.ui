import { redirect } from '@tanstack/react-router'
import { authSession } from '@/auth/auth.session'
import { RoleScope } from './auth.role-scope'
import { Role } from './auth.roles'
import { canAccessArea } from './auth.route-access'
import { RouteArea } from './auth.route-areas'

export function requireAuth() {
  if (!authSession.isAuthenticated()) {
    throw redirect({
      to: '/auth/sign-in',
      search: { reason: 'auth' },
    })
  }
}

export function requireGuest() {
  if (!authSession.hasHydrated()) return

  if (authSession.isAuthenticated()) {
    throw redirect({ to: '/app' })
  }
}

export function requireRole(...roles: Role[]) {
  return () => {
    if (!authSession.hasHydrated()) return

    if (!authSession.hasAnyRole(roles)) {
      throw redirect({ to: '/app/403' })
    }
  }
}

export function requireScope(scope: RoleScope) {
  return () => {
    if (!authSession.hasHydrated()) return

    if (!authSession.hasScope(scope)) {
      throw redirect({ to: '/app/403' })
    }
  }
}

// USAGE:
// export const Route = createFileRoute("/app/customer/_layout")({
//   beforeLoad: requireAreaAccess("customer"),
//   component: () => <Outlet />,
// })

export function requireAreaAccess(area: RouteArea) {
  return () => {
    if (!authSession.hasHydrated()) return

    if (!authSession.isAuthenticated()) {
      throw redirect({ to: '/auth/sign-in' })
    }

    if (!canAccessArea(area)) {
      throw redirect({ to: '/app/403' })
    }
  }
}
