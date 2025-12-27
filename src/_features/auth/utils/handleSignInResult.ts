import type { NavigateFn } from "@tanstack/react-router"
import type { SignInResult } from "@/_api/types/auth"
import { SignInState } from "@/_api/types/auth"
import { authSession } from "@/_auth/auth-session"

export async function handleSignInResult(
  res: SignInResult,
  navigate: NavigateFn
) {

  if (res.state === SignInState.TwoFactorRequired) {
    await navigate({
      to: "/auth/two-factor",
      search: { loginChallengeId: res.loginChallengeId, method: res.method },
    })
    return
  }

  authSession.login(res.accessToken, res.refreshToken, res.expiresInSeconds)
  await navigate({ to: "/" })
}