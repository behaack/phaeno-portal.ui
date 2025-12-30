import { redirect } from "@tanstack/react-router"
import { authSession } from "@/_auth/auth.session"
import { Role } from "./auth.roles"
import { RouteArea } from "./auth.route-areas"
import { canAccessArea } from "./auth.route-access"

export function requireAuth() {
  if (!authSession.isAuthenticated()) {
    throw redirect({
      to: "/auth/signin",
      search: { reason: "auth" },
    })
  }
}

export function requireGuest() {
  if (!authSession.hasHydrated()) return

  if (authSession.isAuthenticated()) {
    throw redirect({ to: "/app" })
  }
}

export function requireRole(...roles: Role[]) {
  return () => {
    if (!authSession.hasHydrated()) return

    if (!authSession.hasAnyRole(roles)) {
      throw redirect({ to: "/403" })
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
      throw redirect({ to: "/auth/sign-in" })
    }

    if (!canAccessArea(area)) {
      throw redirect({ to: "/403" })
    }
  }
}

