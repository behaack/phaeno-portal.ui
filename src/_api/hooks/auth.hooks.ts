import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "@/_api/services/auth.service"
import type {
  SignInRequest,
  SignInResponse,
  SignInAuthenticated,
  TwoFactorVerifyRequest,
} from "@/_api/types/auth"

export function useSignInMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (req: SignInRequest): Promise<SignInResponse> => authService.signIn(req),

    // Invalidate "me" so UI can refresh user after successful auth.
    // This is safe even when sign-in returns TwoFactorRequired.
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["account","me"] }) // preferred
      // or: await qc.invalidateQueries({ queryKey: ["account", "me"] })
    },
  })
}

export function useVerifyTwoFactorMutation() {
  const qc = useQueryClient()

  return useMutation({
    // Verify should only succeed by returning tokens (Authenticated)
    mutationFn: (req: TwoFactorVerifyRequest): Promise<SignInAuthenticated> =>
      authService.verifyTwoFactor(req),

    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["account","me"] })
      // or: await qc.invalidateQueries({ queryKey: ["account", "me"] })
    },
  })
}

export function useResendTwoFactorMutation() {
  return useMutation({
    mutationFn: (loginChallengeId: string) => authService.resendTwoFactor(loginChallengeId),
  })
}
