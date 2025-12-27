// genomic.params.ts
export type GenomicListParams = {
  sampleId?: string | null
  cursor?: string | null
  limit?: number
  q?: string
}

export type GenomicListForOrgParams = GenomicListParams & {
  organizationId: string
}

export type GenomicLookupItem = string

export function toListQueryParams(params: GenomicListParams) {
  return {
    sampleId: params.sampleId ?? undefined,
    cursor: params.cursor ?? undefined,
    limit: params.limit ?? 25,
    q: params.q ?? undefined,
  }
}
