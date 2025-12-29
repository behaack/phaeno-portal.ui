import { useQuery } from "@tanstack/react-query"
import { LookupListParams } from "../types/common"
import { orgService } from "@/_api/services/org.service"

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
      return orgService.customerLookup(params)
    },
  })
}
