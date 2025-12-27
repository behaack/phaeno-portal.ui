import { axiosInstance } from "../core/axios.instance"
import { enc, LookupListParams, toLookupListQueryParams, type LookupListItem } from "../types/common"

export const sampleService = {
  sampleLookup: (params: LookupListParams) => 
    axiosInstance.get<unknown, LookupListItem[]>("/sample/lookup", {
      params: toLookupListQueryParams(params)
    }),
    
  sampleLookupForOrg: (id: string, params: LookupListParams) => 
    axiosInstance.get<unknown, LookupListItem[]>(`/sample/lookup/${enc(id)}`, {
      params: toLookupListQueryParams(params)
    }),
}