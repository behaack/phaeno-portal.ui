import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/_stores/auth.store"
import { accountService } from "../services/account.service"
import { useEffect } from "react"

export const meQueryKey = ["account", "me"] as const

export function useMeQuery() {
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated())
  const setUserAccount = useAuthStore((s) => s.setUserAccount)

  const q = useQuery({
    queryKey: meQueryKey,
    queryFn: accountService.me,
    enabled: hasHydrated && isAuthenticated,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  })

  // when query resolves, sync store
  useEffect(() => {
    if (q.status === "success") setUserAccount(q.data)
  }, [q.status, q.data, setUserAccount])

  return q
}
