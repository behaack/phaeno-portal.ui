import { UserAccount } from "@/_api/types/account"
import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"

export interface IAuthState {
  accessToken: string | null
  refreshToken: string | null
  accessTokenExpiresAtUtc: string | null
  userAccount: UserAccount | null

  // hydration flag
  hasHydrated: boolean
  setHasHydrated: (v: boolean) => void

  isAuthenticated: () => boolean
  login: (accessToken: string, refreshToken: string, expiresInSeconds: number) => void
  rotateTokens: (accessToken: string, refreshToken: string, expiresInSeconds: number) => void
  logout: () => void
  setUserAccount: (userAccount: UserAccount | null) => void
}

function computeExpiresAtUtc(expiresInSeconds?: number): string | null {
  if (typeof expiresInSeconds !== "number" || !Number.isFinite(expiresInSeconds) || expiresInSeconds <= 0) {
    return null
  }
  return new Date(Date.now() + expiresInSeconds * 1000).toISOString()
}

export const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: null,
        refreshToken: null,
        accessTokenExpiresAtUtc: null,
        userAccount: null,
        hasHydrated: false,
        
        setHasHydrated: (v) => set({ hasHydrated: v }),

        setUserAccount: (userAccount: UserAccount | null) => set({
          userAccount: userAccount
        }),

        isAuthenticated: () => {
          const token = get().accessToken
          if (!token) return false

          const exp = get().accessTokenExpiresAtUtc
          if (!exp) return true

          const expMs = Date.parse(exp)
          if (Number.isNaN(expMs)) return true

          return Date.now() < expMs
        },

        login: (accessToken, refreshToken, expiresInSeconds) =>
          set({
            accessToken,
            refreshToken,
            accessTokenExpiresAtUtc: computeExpiresAtUtc(expiresInSeconds),
          }),

        rotateTokens: (accessToken, refreshToken, expiresInSeconds) =>
          set({
            accessToken,
            refreshToken,
            accessTokenExpiresAtUtc: computeExpiresAtUtc(expiresInSeconds),
          }),

        logout: () =>
          set({
            accessToken: null,
            refreshToken: null,
            accessTokenExpiresAtUtc: null,
            userAccount: null
          }),
      }),
      {
        name: "auth-store",
        storage: createJSONStorage(() => sessionStorage),

        // ✅ this is the reliable place to flip the flag
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            // even on error, unblock the app
            state?.setHasHydrated(true)
            return
          }
          state?.setHasHydrated(true)
        },
      }
    )
  )
)
