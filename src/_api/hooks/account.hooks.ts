import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/_stores/authStore"
import { accountService } from "../services/account.service"

export const meQueryKey = ["account", "me"] as const

export function useMeQuery() {
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated())

  return useQuery({
    queryKey: meQueryKey,
    queryFn: accountService.me,
    enabled: hasHydrated && isAuthenticated,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })
}
