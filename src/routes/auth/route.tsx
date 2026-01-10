import { createFileRoute } from '@tanstack/react-router'
import { requireGuest } from '@/auth/auth.guards'
import { AuthShellLayout } from '@/shared/ui/layouts/AuthShellLayout'

export const Route = createFileRoute('/auth')({
  beforeLoad: requireGuest,
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthShellLayout />
}
