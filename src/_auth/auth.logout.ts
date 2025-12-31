import { authService } from "@/_api/services/auth.service"
import { queryClient } from "@/_app/providers/queryClient"
import { authSession } from "./auth.session"
import { useAuthStore } from "@/_stores/auth.store"

// auth.logout.ts
export async function authLogout() {
  // 1️⃣ Best-effort server sign-out (while token still exists)
  try {
    await authService.signOut()
  } catch {
    // swallow errors — logout must always succeed locally
  }
  queryClient.clear()
  await authSession.logout()
}