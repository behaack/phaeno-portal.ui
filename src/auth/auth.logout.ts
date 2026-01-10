import { authService } from '@/api/services/auth.service'
import { queryClient } from '@/app/providers/queryClient'
import { authSession } from './auth.session'

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
