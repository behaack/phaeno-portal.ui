import { requireAuth } from '@/auth/auth.guards'
import { AppShellLayout } from '@/_shared/ui/layouts/AppShellLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/app")({
  beforeLoad: requireAuth,
  component: RouteComponent,
})

function RouteComponent() {
  return <AppShellLayout />
}
