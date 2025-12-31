import type { AxiosInstance } from "axios"
import { attachAuthInterceptor } from "./auth.interceptor"
import { attachRetryInterceptor } from "./retry.interceptor"
import { attachRefreshInterceptor } from "./refresh.interceptor"
import { attachEnvelopeInterceptor } from "./envelope.interceptor"
import { attachErrorInterceptor } from "./error.interceptor"

export function applyInterceptors(client: AxiosInstance) {
  attachAuthInterceptor(client)

  // ✅ infra first
  attachRefreshInterceptor(client)
  attachRetryInterceptor(client)

  // ✅ then response-shaping
  attachEnvelopeInterceptor(client)

  // ✅ last: global side-effects like logout
  attachErrorInterceptor(client)
}
