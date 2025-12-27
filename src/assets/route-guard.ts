import { notFound, redirect } from '@tanstack/react-router';
import { useAuthStore, waitForHydration } from '@/stores/authStore';
import { EOrganizationType } from './enums/_index';

export const beforeLoadAuth = async ({ location }: any) => {
  await waitForHydration();

  const auth = useAuthStore.getState();
  const token = auth.authToken;

  const path = location.pathname.split('/').filter(Boolean);
  const isAuthRoute = path[0] === 'auth';
  const isManageUserRoute = path[0] === 'manage-users';

  const isAuthed = auth.isAuthenticated;

  const isManageUserAllowed =
    !!token &&
    (
      token.organization?.organizationType === EOrganizationType.Phaeno ||
      token.user?.isAdmin === true
    );

  // ─────────────────────────────
  // Manage users (hidden route)
  // ─────────────────────────────
  if (isManageUserRoute && !isManageUserAllowed) {
    throw notFound();
  }

  // ─────────────────────────────
  // Authenticated users
  // ─────────────────────────────
  if (isAuthed) {
    // Block access to auth pages once logged in
    if (isAuthRoute) {
      throw redirect({ to: '/', replace: true });
    }
    return;
  }

  // ─────────────────────────────
  // Unauthenticated users
  // ─────────────────────────────
  if (isAuthRoute) {
    return;
  }

  throw redirect({
    to: '/auth/signin',
    search: {
      redirectTo: location.pathname === '/auth' ? '/' : location.pathname,
    },
    replace: true,
  });
};
