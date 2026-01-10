import { createFileRoute } from '@tanstack/react-router'
import { requireScope } from '@/auth/auth.guards'
import { CustomerIndexPage } from '@/features/customers/CustomerIndexPage'

export const Route = createFileRoute('/app/customers/')({
  beforeLoad: requireScope('phaeno'),
  component: CustomerIndexPage,
})
