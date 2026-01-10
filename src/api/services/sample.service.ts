import { api } from '../core/api-call'
import {
  enc,
  LookupListParams,
  toLookupListQueryParams,
  type LookupListItem,
} from '../types/common'

export const sampleService = {
  sampleLookup: (params: LookupListParams) =>
    api.get<LookupListItem[]>('/sample/lookup', {
      params: toLookupListQueryParams(params),
    }),

  sampleLookupForOrg: (id: string, params: LookupListParams) =>
    api.get<LookupListItem[]>(`/sample/lookup/${enc(id)}`, {
      params: toLookupListQueryParams(params),
    }),
}
