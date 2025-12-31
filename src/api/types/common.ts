export type LookupListParams = {
  q: string
  limit: number
}

export type LookupListItem = {
  value: string
  label: string
}

export function enc(segment: string) {
  return encodeURIComponent(segment)
}

export function toLookupListQueryParams(params: LookupListParams) {
  return {
    q: params.q ?? undefined,
    limit: params.limit ?? 25
  }
}