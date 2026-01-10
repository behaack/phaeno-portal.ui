import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router'
import { useMeQuery } from '@/api/hooks/account.hooks'
import { useAuthStore } from '@/stores/auth.store'

export function EmptyShellLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  // Select primitives to avoid rerender traps
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated())
  const hasHydrated = useAuthStore((s) => s.hasHydrated)

  useMeQuery()

  useEffect(() => {
    if (!hasHydrated) return

    const pathname = location.pathname

    const isAppRoute = pathname === '/app' || pathname.startsWith('/app/')

    if (!isAuthenticated && isAppRoute) {
      navigate({
        to: '/auth',
        replace: true, // prevents back-button loops
      })
    }
  }, [hasHydrated, isAuthenticated, location.pathname, navigate])

  return (
    <div>
      <Outlet />
    </div>
  )
}
