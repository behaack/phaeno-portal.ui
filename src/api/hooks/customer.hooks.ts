import { useQuery } from "@tanstack/react-query"
import { LookupListParams, PagedListParams } from "../types/common"
import { customerService } from "@/api/services/customer.service"

export function useCustomerLookup(params: LookupListParams) {
  return useQuery({
    queryKey: ["organization", "customer", "lookup", params.q],
    staleTime: 1000 * 60 * 60 * 6,     // 6 hours
    gcTime: 1000 * 60 * 60 * 24,       // 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,    
    queryFn: () => {
      return customerService.customerLookup(params)
    },
  })
}

export function useGetCustomers(params: PagedListParams) {
  return useQuery({
    queryKey: ["organization", "customer", "list", { q: params.q, page: params.page }],
    retry: 1,    
    queryFn: () => {
      return customerService.getCustomers(params)
    },
  })
}

export function useGetCustomer(id: string) {
  return useQuery({
    queryKey: ["organization", "customer", "details", { id }],
    retry: 1,    
    queryFn: () => {
      return customerService.getCustomer(id)
    },
  })
}