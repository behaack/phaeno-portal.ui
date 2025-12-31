import { api } from "../core/api-call"
import { LookupListParams, toLookupListQueryParams, type LookupListItem } from "../types/common"

export const orgService = {
  customerLookup: (params: LookupListParams) => 
    api.get<LookupListItem[]>("/organization/lookup/customer", {
      params: toLookupListQueryParams(params)
    }),
}