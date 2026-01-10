import { Role } from '@/auth/auth.roles'

export type Subtype =
  | 'home'
  | 'transcript'
  | 'browser'
  | 'analytics'
  | 'files'
  | 'customers'
  | 'users'
  | 'settings'
  | 'signout'

export default interface IMenuListItem {
  index: number
  isMain: boolean
  type: 'link' | 'button'
  subtype: Subtype
  label: string
  route: string
  userDataRoute: boolean
  roles: Role[] | null
}
