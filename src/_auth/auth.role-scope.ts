import { Role } from "./auth.roles"

export type RoleScope = "phaeno" | "customer" | "partner"

export function getRoleScope(role: Role): RoleScope {
  if (role.startsWith("phaeno")) return "phaeno"
  if (role.startsWith("customer")) return "customer"
  return "partner"
}