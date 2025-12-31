export type LookupListParams = {
  q: string
  limit: number
}

export type LookupListItem = {
  value: string
  label: string
}

export type PagedListParams = {
  page: number
  limit?: number
  q: string
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

export function toPagedListQueryParams(params: PagedListParams) {
  return {
    page: params.page,
    limit: params.limit ?? 25,
    q: params.q ?? undefined,
  }
}
