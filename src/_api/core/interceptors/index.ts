import type { AxiosInstance } from "axios"
import { attachAuthInterceptor } from "./auth.interceptor"
import { attachEnvelopeInterceptor } from "./envelope.interceptor"
import { attachErrorInterceptor } from "./error.interceptor"
import { attachRetryInterceptor } from "./retry.interceptor"

export function applyInterceptors(client: AxiosInstance) {
  attachAuthInterceptor(client)
  attachEnvelopeInterceptor(client)
  attachRetryInterceptor(client)
  attachErrorInterceptor(client)
}
