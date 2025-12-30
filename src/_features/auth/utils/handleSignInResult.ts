import type { NavigateFn } from "@tanstack/react-router"
import type { SignInResponse } from "@/_api/types/auth"
import { ESignInState } from "@/_api/types/auth"
import { authSession } from "@/_auth/auth.session"

export async function handleSignInResult(res: SignInResponse, navigate: NavigateFn) {
  if (res.state === ESignInState.TwoFactorRequired) {
    await navigate({
      to: "/auth/two-factor",
      search: { loginChallengeId: res.loginChallengeId, method: res.method },
    })
    return
  }

  // Authenticated
  authSession.login(res.accessToken, res.refreshToken, res.expiresInSeconds)
  await navigate({ to: "/" })
}
