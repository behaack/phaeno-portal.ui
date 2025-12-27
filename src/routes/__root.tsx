import { createRootRoute } from '@tanstack/react-router';
import { AppShellLayout } from '@/_shared/ui/layout/AppShellLayout';

export const Route = createRootRoute({
  shellComponent: RootDocument,
});

function RootDocument() {
  return <AppShellLayout />;
}
