import { createFileRoute } from '@tanstack/react-router'
import { NotAuthorizedPage } from '@/features/not-authorized/NotAuthorizedPage'

export const Route = createFileRoute('/app/403')({
  component: NotAuthorizedPage,
})
