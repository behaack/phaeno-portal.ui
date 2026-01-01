export type UserListItem = {
  id: string
  email: string
  organizationId: string
  firstName: string
  lastName: string
  isAdmin: boolean
  isSetup: boolean
  rowVersion?: any
}

export type UserDetails = {
  id: string
  organizationId: string
  email: string
  firstName: string
  lastName: string
  isAdmin: boolean
  isSetup: boolean
  rowVersion?: any
}