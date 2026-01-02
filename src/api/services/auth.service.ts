import type {
  SignInRequest,
  SignInResponse,
  SignInAuthenticated,
  TwoFactorVerifyRequest,
} from "@/api/types/auth"
import { api } from "../core/api-call"

export const authService = {
  signIn: (req: SignInRequest) => 
    api.post<SignInResponse, SignInRequest>("/auth/sign-in", req),

  signOut: () => api.post<null, null>("/auth/sign-out"),

  verifyTwoFactor: (req: TwoFactorVerifyRequest) =>
    api.post<SignInAuthenticated, TwoFactorVerifyRequest>("/auth/verify-2fa", req),

  resendTwoFactor: (loginChallengeId: string) =>
    api.post<{ ok: true }, { loginChallengeId: string }>(
      "/auth/2fa/resend",
      { loginChallengeId }
    ),
}
