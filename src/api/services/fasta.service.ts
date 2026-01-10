import type { FastaDetailsItem, FastaListItem } from '@/api/types/fasta'
import type {
  GenomicListForOrgParams,
  GenomicListParams,
  GenomicLookupItem,
} from '@/api/types/genomic.common'
import { toListQueryParams } from '@/api/types/genomic.common'
import type { CursorPage } from '@/api/types/paging'
import { api } from '../core/api-call'
import { enc, LookupListParams, toLookupListQueryParams } from '../types/common'

export const fastaService = {
  list: (params: GenomicListParams) =>
    api.get<CursorPage<FastaListItem>>('/fasta', {
      params: toListQueryParams(params),
    }),

  listForOrganization: (params: GenomicListForOrgParams) =>
    api.get<CursorPage<FastaListItem>>(`/fasta/for-organization/${enc(params.organizationId)}`, {
      params: toListQueryParams(params),
    }),

  get: (id: string) => api.get<FastaDetailsItem>(`/fasta/${enc(id)}`),

  lookup: (params: LookupListParams) =>
    api.get<GenomicLookupItem[]>('/fasta/lookup', {
      params: toLookupListQueryParams(params),
    }),

  lookupForOrganization: (params: LookupListParams, organizationId: string) =>
    api.get<GenomicLookupItem[]>(`/fasta/lookup/${enc(organizationId)}`, {
      params: toLookupListQueryParams(params),
    }),
}
