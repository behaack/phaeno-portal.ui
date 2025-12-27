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
    search: params.q ?? undefined,
    pageSize: params.limit ?? 25
  }
}