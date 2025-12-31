import { Role } from "@/auth/auth.roles"
import { roleUtils } from "@/auth/auth.roles-utils"

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