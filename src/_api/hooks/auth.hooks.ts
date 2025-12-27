import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "@/_api/services/auth.service"
import type { SignInRequest, SignInTokens, TwoFactorVerifyRequest } from "@/_api/types/auth"

export function useSignInMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (req: SignInRequest) => authService.signIn(req),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["me"] })
    },
  })
}

export function useVerifyTwoFactorMutation() {
  return useMutation({
    mutationFn: (req: TwoFactorVerifyRequest): Promise<SignInTokens> =>
      authService.verifyTwoFactor(req),
  })
}

export function useResendTwoFactorMutation() {
  return useMutation({
    mutationFn: (loginChallengeId: string) => authService.resendTwoFactor(loginChallengeId),
  })
}
