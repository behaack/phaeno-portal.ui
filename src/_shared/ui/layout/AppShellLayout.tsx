import { Outlet } from "@tanstack/react-router"
import Header from "./Header"

export function AppShellLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <div className="app-container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
