import { requireGuest } from '@/auth/auth.guards'
import { AuthShellLayout } from '@/shared/ui/layouts/AuthShellLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/auth")({
  beforeLoad: requireGuest,
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthShellLayout />
}
