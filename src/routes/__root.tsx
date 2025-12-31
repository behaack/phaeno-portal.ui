import { EmptyShellLayout } from '@/shared/ui/layouts/EmptyShellLayout';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  shellComponent: RootDocument,
});

function RootDocument() {
  return <EmptyShellLayout />;
}
