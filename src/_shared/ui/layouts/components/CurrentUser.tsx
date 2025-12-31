import { useAuthStore } from '@/stores/auth.store';

export default function CurrentUser() {
  const store = useAuthStore()
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
