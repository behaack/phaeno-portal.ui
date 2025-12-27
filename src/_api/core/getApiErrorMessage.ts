import type { ApiEnvelopeError } from "./types"

export function getApiErrorMessage(err: unknown): string {
  const e = err as any

  // Envelope errors
  const env = e as ApiEnvelopeError
  if (env?.success === false && env?.error?.message) {
    const d = env.error.details
    const firstValidation = Array.isArray(d) ? d[0]?.messages?.[0] : null
    return firstValidation || env.error.message
  }

  // Network/axios/etc.
  return e?.message ?? "Something went wrong. Please try again."
}
