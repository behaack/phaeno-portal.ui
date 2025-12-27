// fasta.service.ts
import { axiosInstance } from "@/_api/core/axios.instance"
import type { CursorPage } from "@/_api/types/paging"
import type { GenomicListParams, GenomicListForOrgParams, GenomicLookupItem } from "@/_api/types/genomic.common"
import type { FastaListItem, FastaDetailsItem } from "@/_api/types/fasta"
import { toListQueryParams } from "@/_api/types/genomic.common"
import { enc } from "../types/common"

export const fastaService = {
  list: (params: GenomicListParams) =>
    axiosInstance.get<unknown, CursorPage<FastaListItem>>("/fasta", {
      params: toListQueryParams(params),
    }),

  listForOrganization: (params: GenomicListForOrgParams) =>
    axiosInstance.get<unknown, CursorPage<FastaListItem>>(
      `/fasta/for-organization/${enc(params.organizationId)}`,
      { params: toListQueryParams(params) }
    ),

  get: (id: string) =>
    axiosInstance.get<unknown, FastaDetailsItem>(`/fasta/${enc(id)}`),

  lookup: () => axiosInstance.get<unknown, GenomicLookupItem[]>("/fasta/lookup"),

  lookupForOrganization: (organizationId: string) =>
    axiosInstance.get<unknown, GenomicLookupItem[]>(`/fasta/lookup/${enc(organizationId)}`),
}
