import { Role } from "@/auth/auth.roles.js"
import type { EOrganizationType } from "./enums.ts"

export type UserAccount = {
  userId: string
  organizationType: EOrganizationType
  organizationId: string
  organizationName: string
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
  roles: Role[]
}