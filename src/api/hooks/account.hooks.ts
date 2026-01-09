import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import { accountService } from "../services/account.service";
import { useEffect } from "react";
import { PasswordRecoveryStartRequest } from "../types/account";

export const meQueryKey = ["account", "me"] as const;

export function useMeQuery() {
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

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

export function usePasswordRecoveryStart() {
  return useMutation({ 
    mutationFn:  (req: PasswordRecoveryStartRequest): Promise<null> =>
      accountService.passwordRecoveryStart(req) 
  });
}

export function usePasswordRecoveryConfirm() {
  return useMutation({
    mutationFn: accountService.passwordRecoveryConfirm,
  });
}

export function useTotpStart() {
  return useMutation({ mutationFn: accountService.totpStart });
}

export function useTotpConfirm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: accountService.totpConfirm,
    onSuccess: () => qc.invalidateQueries({ queryKey: meQueryKey }),
  });
}

export function useOobStart() {
  return useMutation({ mutationFn: accountService.oobStart });
}

export function useOobConfirm() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: accountService.oobConfirm,
    onSuccess: () => qc.invalidateQueries({ queryKey: meQueryKey }),
  });
}
