import { api } from "../core/api-call"
import { IPagedList } from "@/shared/types/IPagedList"
import { LookupListParams, PagedListParams, toLookupListQueryParams, toPagedListQueryParams, LookupListItem } from "../types/common"
import { Organization } from "../types/organization"

export const customerService = {
  customerLookup: (params: LookupListParams) => 
    api.get<LookupListItem[]>("/organization/lookup/customer", {
      params: toLookupListQueryParams(params)
    }),

  getCustomers: (params: PagedListParams) => 
    api.get<IPagedList<Organization>>("/organization/customers", {
      params: toPagedListQueryParams(params)
    }),

  getCustomer: (id: string) => 
    api.get<Organization>(`/organization/${id}`),

  addOrganization: (body: Organization) =>
    api.post<Organization>('organization', body),

  updateOrganization: (body: Organization) => 
    api.put<Organization>('organization', body),
}