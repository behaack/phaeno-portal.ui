import type { AxiosInstance } from "axios"
import { AxiosHeaders } from "axios"
import { authSession } from "@/_auth/auth.session"
import { AuthResult } from "@/api/types/auth"

type RetryConfig = any & { __refreshRetried?: boolean }

let isRefreshing = false
let waiters: Array<(token: string | null) => void> = []

const NO_REFRESH_PATHS = [
  "/auth/sign-in",
  "/auth/two-factor",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/refresh-token", // already handled, but keep here too
]

function shouldSkipRefresh(config: RetryConfig) {
  if (config.skipAuthRefresh) return true
  const url = String(config.url ?? "")
  return NO_REFRESH_PATHS.some((p) => url.includes(p))
}

function notifyWaiters(token: string | null) {
  for (const w of waiters) w(token)
  waiters = []
}

function setAuthHeader(config: any, token: string) {
  const headers = AxiosHeaders.from(config.headers)
  headers.set("Authorization", `Bearer ${token}`)
  config.headers = headers
}

export function attachRefreshInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(undefined, async (error) => {
    const config = error?.config as RetryConfig | undefined
    const status = error?.response?.status

    if (!config) throw error
    if (status !== 401) throw error

    // ✅ NEW: don't refresh for sign-in / auth flows
    if (shouldSkipRefresh(config)) throw error    

    // prevent infinite loops
    if (config.__refreshRetried) throw error
    config.__refreshRetried = true

    // don't refresh a refresh call
    const url: string = config.url ?? ""
    if (url.includes("/auth/refresh-token")) {
      authSession.logout()
      throw error
    }

    // if a refresh is already happening, wait for it
    if (isRefreshing) {
      const token = await new Promise<string | null>((resolve) => waiters.push(resolve))
      if (!token) {
        authSession.logout()
        throw error
      }
      setAuthHeader(config, token)
      return client(config)
    }

    isRefreshing = true

    try {
      // NOTE: if your envelope interceptor unwraps response.data,
      // this will already be the AuthResultDto.
      const dto = await client.post<unknown, AuthResult>(
        "/auth/refresh-token",
        {},
        { withCredentials: true }
      )

      if (!dto?.accessToken || !dto?.refreshToken || typeof dto.expiresInSeconds !== "number") {
        throw new Error("Refresh response missing required fields.")
      }

      authSession.rotateTokens(dto.accessToken, dto.refreshToken, dto.expiresInSeconds)

      notifyWaiters(dto.accessToken)

      setAuthHeader(config, dto.accessToken)
      return client(config)
    } catch (refreshErr) {
      notifyWaiters(null)
      authSession.logout()
      throw refreshErr
    } finally {
      isRefreshing = false
    }
  })
}
