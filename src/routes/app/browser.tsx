import { createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '@/auth/auth.guards'
import { BrowserIndexPage } from '@/features/browser/BrowserIndexPage'

export const Route = createFileRoute('/app/browser')({
  beforeLoad: requireAuth,
  component: BrowserIndexPage,
})
