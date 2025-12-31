export type ApiMeta = {
  requestId: string
  timestampUtc: string
}

export type ApiErrorDetail = {
  field: string
  messages: string[]
}

export type ApiError = {
  type: string
  code: string
  message: string
  details?: ApiErrorDetail[]
  param?: string | null
}

export type ApiEnvelopeSuccess<T> = {
  success: true
  data: T
  error: null
  meta: ApiMeta
}

export type ApiEnvelopeError = {
  success: false
  data: null
  error: ApiError
  meta: ApiMeta
}

export type ApiEnvelope<T> = ApiEnvelopeSuccess<T> | ApiEnvelopeError
