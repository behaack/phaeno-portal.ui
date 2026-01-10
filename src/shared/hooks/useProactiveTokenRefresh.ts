// src/_auth/useProactiveTokenRefresh.ts
import { useEffect } from 'react'
import { refreshTokensSingleFlight } from '@/auth/refresh.manager'
import { useAuthStore } from '@/stores/auth.store'

export function useProactiveTokenRefresh() {
  const hasHydrated = useAuthStore((s) => s.hasHydrated)
  const token = useAuthStore((s) => s.accessToken)
  const expMs = useAuthStore((s) => s.accessTokenExpiresAtMs)

  useEffect(() => {
    if (!hasHydrated) return
    if (!token) return
    if (!expMs || !Number.isFinite(expMs)) return

    // Refresh 60s before exp (tune as you like)
    const REFRESH_EARLY_MS = 60_000
    const delayMs = Math.max(0, expMs - Date.now() - REFRESH_EARLY_MS)

    const timer = window.setTimeout(() => {
      // fire-and-forget; interceptor remains the safety net
      refreshTokensSingleFlight().catch(() => {
        // refresh manager/interceptor should log out on failures,
        // so nothing needed here unless you want telemetry
      })
    }, delayMs)

    return () => window.clearTimeout(timer)
  }, [hasHydrated, token, expMs])
}
