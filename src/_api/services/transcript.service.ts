// transcript.service.ts
import { axiosInstance } from "@/_api/core/axios.instance"
import type { CursorPage } from "@/_api/types/paging"
import type { GenomicListParams, GenomicListForOrgParams, GenomicLookupItem } from "@/_api/types/genomic.common"
import type { TranscriptListItem, TranscriptDetailsItem } from "@/_api/types/transcript"
import { toListQueryParams, enc } from "@/_api/types/genomic.common"

export const transcriptService = {
  /** GET /transcript (current org from JWT claims) */
  list: (params: GenomicListParams) =>
    axiosInstance.get<unknown, CursorPage<TranscriptListItem>>("/transcript", {
      params: toListQueryParams(params),
    }),

  /** GET /transcript/for-organization/{organizationId} */
  listForOrganization: (params: GenomicListForOrgParams) =>
    axiosInstance.get<unknown, CursorPage<TranscriptListItem>>(
      `/transcript/for-organization/${enc(params.organizationId)}`,
      { params: toListQueryParams(params) }
    ),

  /** GET /transcript/{id} */
  get: (id: string) =>
    axiosInstance.get<unknown, TranscriptDetailsItem>(`/transcript/${enc(id)}`),

  /** GET /transcript/lookup (current org) */
  lookup: () =>
    axiosInstance.get<unknown, GenomicLookupItem[]>("/transcript/lookup"),

  /** GET /transcript/lookup/{organizationId} */
  lookupForOrganization: (organizationId: string) =>
    axiosInstance.get<unknown, GenomicLookupItem[]>(
      `/transcript/lookup/${enc(organizationId)}`
    ),
}
