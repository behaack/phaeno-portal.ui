import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/password-recovery/')({
  component: AuthPasswordRecoverIndex,
  beforeLoad: async () => {
    throw redirect({ to: '/auth/password-recovery/step-1' });
  },
});

function AuthPasswordRecoverIndex() {
  return (
    <main>
      <section>
        <div className="w-full h-full">
          <title>Auth - PSeq Browser</title>
          <Outlet />
        </div>
      </section>
    </main>
  );
}
