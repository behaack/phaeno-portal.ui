import type { EOrganizationType } from "./enums" // wherever your enum lives

export type MeDto = {
  userId: string
  organizationType: EOrganizationType
  organizationId: string
  organizationName: string
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
  roles: string[]
}