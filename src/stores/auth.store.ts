import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { UserAccount } from '@/api/types/account'

export interface IAuthState {
  accessToken: string | null
  refreshToken: string | null
  accessTokenExpiresAtMs: number | null
  userAccount: UserAccount | null

  // hydration flag
  hasHydrated: boolean
  setHasHydrated: (v: boolean) => void
  isAccessTokenExpired: () => boolean
  isAuthenticated: () => boolean
  hasToken: () => boolean
  login: (accessToken: string, refreshToken: string, expiresInSeconds: number) => void
  rotateTokens: (accessToken: string, refreshToken: string, expiresInSeconds: number) => void
  setAccessToken: (accessToken: string, expiresInSeconds: number) => void
  setUserAccount: (userAccount: UserAccount | null) => void
  logout: () => void
}

function computeExpiresAtMs(expiresInSeconds?: number): number | null {
  if (
    typeof expiresInSeconds !== 'number' ||
    !Number.isFinite(expiresInSeconds) ||
    expiresInSeconds <= 0
  ) {
    return null
  }
  return Date.now() + expiresInSeconds * 1000
}

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: null,
        refreshToken: null,
        accessTokenExpiresAtMs: null,
        userAccount: null,
        hasHydrated: false,

        setHasHydrated: (v) => set({ hasHydrated: v }),

        setUserAccount: (userAccount: UserAccount | null) =>
          set({
            userAccount: userAccount,
          }),

        hasToken: () => !!get().accessToken,

        isAccessTokenExpired: () => {
          const exp = get().accessTokenExpiresAtMs
          if (exp == null) return false
          if (!Number.isFinite(exp)) return true
          const SKEW_MS = 30_000
          return Date.now() >= exp - SKEW_MS
        },

        isAuthenticated: () => !!get().accessToken && !get().isAccessTokenExpired(),

        login: (accessToken, refreshToken, expiresInSeconds) =>
          set({
            accessToken,
            refreshToken,
            accessTokenExpiresAtMs: computeExpiresAtMs(expiresInSeconds),
          }),

        setAccessToken: (accessToken: string, expiresInSeconds: number) =>
          set({
            accessToken,
            accessTokenExpiresAtMs: computeExpiresAtMs(expiresInSeconds),
          }),

        rotateTokens: (accessToken, refreshToken, expiresInSeconds) =>
          set({
            accessToken,
            refreshToken,
            accessTokenExpiresAtMs: computeExpiresAtMs(expiresInSeconds),
          }),

        logout: () =>
          set({
            accessToken: null,
            refreshToken: null,
            accessTokenExpiresAtMs: null,
            userAccount: null,
          }),
      }),
      {
        name: 'auth-store',
        storage: createJSONStorage(() => sessionStorage),

        partialize: (s) => ({
          accessToken: s.accessToken,
          refreshToken: s.refreshToken,
          accessTokenExpiresAtMs: s.accessTokenExpiresAtMs,
          userAccount: s.userAccount,
        }),

        onRehydrateStorage: () => (state, error) => {
          state?.setHasHydrated(true)
        },
      }
    )
  )
)
