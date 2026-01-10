import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/api/services/auth.service'
import type { SignInAuthenticated, TwoFactorVerifyRequest } from '@/api/types/auth'

export function useSignInMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: authService.signIn,

    onSuccess: async (res) => {
      await qc.refetchQueries({ queryKey: ['account', 'me'] })
    },
  })
}

export function useVerifyTwoFactorMutation() {
  const qc = useQueryClient()

  return useMutation({
    // Verify should only succeed by returning tokens (Authenticated)
    mutationFn: (req: TwoFactorVerifyRequest): Promise<SignInAuthenticated> =>
      authService.verifyTwoFactor(req),

    onSuccess: async (res) => {
      await qc.refetchQueries({ queryKey: ['account', 'me'] })
    },
  })
}

export function useResendTwoFactorMutation() {
  return useMutation({
    mutationFn: (loginChallengeId: string) => authService.resendTwoFactor(loginChallengeId),
  })
}
