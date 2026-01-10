import type { ApiEnvelopeError } from '@/api/core/types'

export function getApiErrorMessage(err: unknown): string {
  const e = err as any

  // Envelope error
  const env = e as ApiEnvelopeError
  if (env?.success === false && env?.error?.message) {
    const details = env.error.details
    if (Array.isArray(details) && details.length) {
      // First validation message (nice UX)
      const first = details[0]
      const msg = first?.messages?.[0]
      if (msg) return msg
    }
    return env.error.message
  }

  // Axios/network/etc
  return e?.message ?? 'Something went wrong. Please try again.'
}
