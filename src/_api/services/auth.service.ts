import { apiCall } from "@/_api/core/api-client"
import type { SignInRequest, SignInResult, SignInTokens, TwoFactorVerifyRequest,  } from "@/_api/types/auth"

export const authService = {
  signIn: (req: SignInRequest) =>
    apiCall<SignInResult, SignInRequest>("/auth/sign-in", "post", req),

  verifyTwoFactor: (req: TwoFactorVerifyRequest) =>
    apiCall<SignInTokens, TwoFactorVerifyRequest>("/auth/2fa/verify", "post", req),

  resendTwoFactor: (loginChallengeId: string) =>
    apiCall<{ ok: true }, { loginChallengeId: string }>("/auth/2fa/resend", "post", { loginChallengeId } ),  
}
