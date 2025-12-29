import { api } from "../core/api-call"
import type { CursorPage } from "@/_api/types/paging"
import type { GenomicListParams, GenomicListForOrgParams, GenomicLookupItem } from "@/_api/types/genomic.common"
import type { TranscriptListItem, TranscriptDetailsItem } from "@/_api/types/transcript"
import { toListQueryParams } from "@/_api/types/genomic.common"
import { enc, LookupListParams, toLookupListQueryParams } from "../types/common"

export const transcriptService = {
  /** GET /transcript (current org from JWT claims) */
  list: (params: GenomicListParams) =>
    api.get<CursorPage<TranscriptListItem>>("/transcript", {
      params: toListQueryParams(params),
    }),

  /** GET /transcript/for-organization/{organizationId} */
  listForOrganization: (params: GenomicListForOrgParams) =>
    api.get<CursorPage<TranscriptListItem>>(
      `/transcript/for-organization/${enc(params.organizationId)}`,
      { params: toListQueryParams(params) }
    ),

  /** GET /transcript/{id} */
  get: (id: string) =>
    api.get<TranscriptDetailsItem>(`/transcript/${enc(id)}`),

  /** GET /transcript/lookup (current org) */
  lookup: (params: LookupListParams) =>
    api.get<GenomicLookupItem[]>("/transcript/lookup", {
      params: toLookupListQueryParams(params)
    }),

  /** GET /transcript/lookup/{organizationId} */
  lookupForOrganization: (params: LookupListParams, organizationId: string) =>
    api.get<GenomicLookupItem[]>(
      `/transcript/lookup/${enc(organizationId)}`, {
          params: toLookupListQueryParams(params)
      }),
}
