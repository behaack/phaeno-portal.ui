import { createFileRoute } from '@tanstack/react-router'
import { requireRole } from '@/auth/auth.guards'
import { UserIndexPage } from '@/features/users/UserIndexPage'

export const Route = createFileRoute('/app/users/')({
  beforeLoad: requireRole('partner-admin', 'customer-admin', 'phaeno-admin'),
  component: UserIndexPage,
})
