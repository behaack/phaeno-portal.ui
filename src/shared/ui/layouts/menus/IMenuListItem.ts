export type Subtype =
  | 'home'
  | 'transcript'
  | 'browser'
  | 'analytics'
  | 'files'
  | 'manage-users'
  | 'customers'
  | 'api-keys'
  | 'security-settings'
  | 'signout'

export default interface IMenuListItem {
  index: number
  isMain: boolean
  type: 'link' | 'button'
  subtype: Subtype
  label: string
  route: string
  userDataRoute: boolean
}
