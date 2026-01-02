import { useMutation, useQueryClient } from "@tanstack/react-query";
import { meQueryKey } from "./account.hooks";
import { accountService } from "../services/account.service";

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