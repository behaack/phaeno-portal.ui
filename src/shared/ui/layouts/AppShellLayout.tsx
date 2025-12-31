import { Outlet } from "@tanstack/react-router"
import { AppHeader } from "./headers/AppHeader"
import { usePipelineHub } from "@/shared/hooks/usePipelineHub";

export function AppShellLayout() {
  usePipelineHub();
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <div className="app-container">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
