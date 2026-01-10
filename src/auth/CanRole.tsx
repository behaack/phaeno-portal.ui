import type React from 'react'
import type { Role } from '@/auth/auth.roles'
import { roleUtils } from '@/auth/auth.roles-utils'

type RoleRequirement = Role | Role[] | null | undefined

export interface CanRoleProps {
  role?: RoleRequirement
  children: React.ReactNode
}

export function CanRole({ role, children }: CanRoleProps) {
  // null/undefined means "no restriction"
  if (role == null) return <>{children}</>

  const roles = Array.isArray(role) ? role : [role]

  // If someone passes [] treat it as no restriction (optional; change if you prefer "deny all")
  if (roles.length === 0) return <>{children}</>

  const allowed = roles.some((r) => roleUtils.has(r))
  return allowed ? <>{children}</> : null
}
