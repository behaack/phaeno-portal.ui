import { useAuthStore } from '@/stores/authStore';

export default function CurrentUser() {
  const authStore = useAuthStore();
  return (
    <div className="bg-zinc-600">
      <div className="p-3">
        <div className="font-bold text-sm">
          {authStore.authToken?.organization.organizationName}
        </div>
        <div className="text-xs">
          {authStore.authToken?.user.firstName} {authStore.authToken?.user.lastName}
        </div>
      </div>
    </div>
  );
}
