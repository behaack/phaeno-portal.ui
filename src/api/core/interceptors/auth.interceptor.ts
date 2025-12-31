import type { AxiosInstance } from "axios"
import { AxiosHeaders } from "axios"
import { authSession } from "@/auth/auth.session"

export function attachAuthInterceptor(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    const token = authSession.getAccessToken()
    if (!token) return config

    const headers = AxiosHeaders.from(config.headers)
    headers.set("Authorization", `Bearer ${token}`)
    config.headers = headers

    return config
  })
}
