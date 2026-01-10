import { createRootRoute } from '@tanstack/react-router'
import { EmptyShellLayout } from '@/shared/ui/layouts/EmptyShellLayout'

export const Route = createRootRoute({
  shellComponent: RootDocument,
})

function RootDocument() {
  return <EmptyShellLayout />
}
