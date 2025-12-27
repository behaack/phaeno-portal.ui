import { useMeQuery } from '@/_api/hooks/account.hooks';
import { useAuthStore } from '@/_stores/auth.store';

export default function CurrentUser() {
const isAuthenticated = useAuthStore((s) => s.isAuthenticated())
  const { data: me, isLoading, isError } = useMeQuery()
  if (!isAuthenticated) return null
  return (
    <div className="bg-zinc-600 text-white">
      <div className="p-3">
        <div className="font-bold text-sm">
          {me?.organizationName}
        </div>
        <div className="text-xs">
          {me?.firstName} {me?.lastName}
        </div>
      </div>
    </div>
  );
}
