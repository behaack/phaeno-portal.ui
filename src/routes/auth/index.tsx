import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
  beforeLoad: async () => {
    throw redirect({ to: '/auth/sign-in' });
  },
});

function RouteComponent() {
  return <div>&nbsp;</div>;
}
