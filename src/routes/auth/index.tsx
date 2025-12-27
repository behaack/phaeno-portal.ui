import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
  beforeLoad: async () => {
    throw redirect({ to: '/auth/signin' });
  },
});

function RouteComponent() {
  return <div>&nbsp;</div>;
}
