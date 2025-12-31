import { Outlet } from "@tanstack/react-router"
import { AuthHeader } from "./headers/AuthHeader"

export function EmptyShellLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
