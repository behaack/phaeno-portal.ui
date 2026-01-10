import { Outlet } from '@tanstack/react-router'
import { usePipelineHub } from '@/shared/hooks/usePipelineHub'
import { AppHeader } from './headers/AppHeader'

export function AppShellLayout() {
  usePipelineHub()
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
