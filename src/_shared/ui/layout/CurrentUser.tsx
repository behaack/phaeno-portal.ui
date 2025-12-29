import { useMeQuery } from '@/_api/hooks/account.hooks';
import { useAuthStore } from '@/_stores/auth.store';
import { useEffect } from 'react';

export default function CurrentUser() {
  const store = useAuthStore()
  if (!store.isAuthenticated) return null  
  return (
    <div className="bg-zinc-600 text-white">
      <div className="p-3">
        <div className="font-bold text-sm">
          {store.userAccount?.organizationName}
        </div>
        <div className="text-xs">
          {store.userAccount?.firstName} {store.userAccount?.lastName}
        </div>
      </div>
    </div>
  );
}
