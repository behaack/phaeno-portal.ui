import { useAuthStore } from "@/_stores/auth.store"

export const authSession = {
  getAccessToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,

  login: (accessToken: string, refreshToken: string, expiresInSeconds: number) =>
    useAuthStore.getState().login(accessToken, refreshToken, expiresInSeconds),

  rotateTokens: (accessToken: string, refreshToken: string, expiresInSeconds: number) =>
    useAuthStore.getState().rotateTokens(accessToken, refreshToken, expiresInSeconds),

  logout: () => useAuthStore.getState().logout(),
}
