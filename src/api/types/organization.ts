import { EOrganizationType } from './enums'

export type Organization = {
  id: string
  organizationName: string
  organizationType: EOrganizationType
  street1: string
  street2: string
  city: string
  state: string
  postalCode: string
  countryCode: string
  rowVersion: string
}
