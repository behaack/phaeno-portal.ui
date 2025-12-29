import { axiosInstance } from "../core/axios.instance"
import { enc, LookupListParams, toLookupListQueryParams, type LookupListItem } from "../types/common"

export const orgService = {
  customerLookup: (params: LookupListParams) => 
    axiosInstance.get<unknown, LookupListItem[]>("/organization/lookup/customer", {
      params: toLookupListQueryParams(params)
    }),
}