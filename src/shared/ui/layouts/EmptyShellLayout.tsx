import { useMeQuery } from "@/api/hooks/account.hooks"
import { Outlet, useNavigate } from "@tanstack/react-router"
import { useAuthStore } from "@/stores/auth.store"
import { useEffect } from "react";

export function EmptyShellLayout() {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  useMeQuery()

  useEffect(() => {
    if (!authStore.isAuthenticated()) {
      navigate({
        to: "/auth"
      })
    }
  }, [authStore.isAuthenticated()]) 

  return (
    <div>
      <Outlet />
    </div>
  )
}
