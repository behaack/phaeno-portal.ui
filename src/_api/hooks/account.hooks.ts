import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/_stores/auth.store";
import { accountService } from "../services/account.service";
import { useEffect } from "react";
import { UserAccount } from "../types/account";

export const meQueryKey = ["account", "me"] as const;

export function useMeQuery() {
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  // Prefer selecting a primitive that flips when auth changes
  const accessToken = useAuthStore((s) => s.accessToken); // adjust to your store
  const setUserAccount = useAuthStore((s) => s.setUserAccount);

  const enabled = hasHydrated && Boolean(accessToken);

  const q = useQuery({
    queryKey: meQueryKey,
    queryFn: accountService.me, // returns UserAccount
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  useEffect(() => {
    // @ts-ignore
    if (q.status === "success") setUserAccount(q.data);
  }, [q.status, q.data, setUserAccount]);

  return q;
}
