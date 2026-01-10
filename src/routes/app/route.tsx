import { createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '@/auth/auth.guards'
import { AppShellLayout } from '@/shared/ui/layouts/AppShellLayout'

export const Route = createFileRoute('/app')({
  beforeLoad: requireAuth,
  component: RouteComponent,
})

function RouteComponent() {
  return <AppShellLayout />
}
