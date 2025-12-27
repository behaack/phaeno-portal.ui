// src/_auth/refresh.manager.ts
import { axiosInstance } from "@/_api/core/axios.instance"
import { authSession } from "@/_auth/auth-session"

type AuthResultDto = {
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
}

let inflight: Promise<string> | null = null

export function refreshTokensSingleFlight(): Promise<string> {
  if (inflight) return inflight

  inflight = (async () => {
    const dto = await axiosInstance.post<unknown, AuthResultDto>("/auth/refresh", {}, { withCredentials: true })
    authSession.rotateTokens(dto.accessToken, dto.refreshToken, dto.expiresInSeconds)
    return dto.accessToken
  })()

  inflight.finally(() => {
    inflight = null
  })

  return inflight
}
