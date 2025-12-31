import { Outlet } from "@tanstack/react-router"
import { AuthHeader } from "./headers/AuthHeader"

export function AuthShellLayout() {
  return (
    <div className="app-shell">
      <AuthHeader />
      <main className="app-main">
        <div className="app-container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
