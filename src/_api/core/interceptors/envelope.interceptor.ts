import type { AxiosInstance, AxiosResponse } from "axios"
import type { ApiEnvelope, ApiEnvelopeError } from "../types"

function isEnvelope(x: any): x is ApiEnvelope<unknown> {
  return x && typeof x === "object" && typeof x.success === "boolean" && "data" in x
}

function isEnvelopeError(x: any): x is ApiEnvelopeError {
  return x && typeof x === "object" && x.success === false && x.error?.message
}

export function attachEnvelopeInterceptor(client: AxiosInstance) {
  client.interceptors.response.use(
    ((response: AxiosResponse) => {
      const payload = response.data

      // ✅ only unwrap if it truly is an envelope
      if (!isEnvelope(payload)) return payload

      if (payload.success === false) return Promise.reject(payload)
      return payload.data
    }) as any,
    ((error: any) => {
      const payload = error?.response?.data
      if (isEnvelopeError(payload)) return Promise.reject(payload)
      return Promise.reject(error)
    }) as any
  )
}
