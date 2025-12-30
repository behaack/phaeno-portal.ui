import { Role } from "@/_auth/auth.roles"
import { roleUtils } from "@/_auth/auth.roles-utils"

export interface IProps {
  role: Role
  children: React.ReactNode
}

export function CanRole({
  role,
  children,
}: IProps) {
  if (!roleUtils.has(role)) return null
  return <>{children}</>
}