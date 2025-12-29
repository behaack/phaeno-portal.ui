import type {
  SignInRequest,
  SignInResponse,
  SignInAuthenticated,
  TwoFactorVerifyRequest,
} from "@/_api/types/auth"
import { api } from "../core/api-call"

export const authService = {
  signIn: (req: SignInRequest) =>
    api.post<SignInResponse, SignInRequest>("/auth/sign-in", req),

  verifyTwoFactor: (req: TwoFactorVerifyRequest) =>
    api.post<SignInAuthenticated, TwoFactorVerifyRequest>("/auth/2fa/verify", req),

  resendTwoFactor: (loginChallengeId: string) =>
    api.post<{ ok: true }, { loginChallengeId: string }>(
      "/auth/2fa/resend",
      { loginChallengeId }
    ),
}
