import { useQuery } from "@tanstack/react-query"
import { sampleService } from "@/_api/services/sample.service"
import { useImpersonationStore } from "@/_stores/impersonation.store"
import { useAuthStore } from "@/_stores/auth.store"
import { isPhaenoEmployee } from "@/_api/types/auth.guards"
import { LookupListParams } from "../types/common"

export function useSampleLookup(params: LookupListParams) {
  const roles = useAuthStore((s) => s.userAccount?.roles)
  const employee = isPhaenoEmployee(roles)

  const selectedOrgId = useImpersonationStore((s) => s.selectedOrganizationId)

  // customer => enabled
  // employee => enabled only after selecting org
  const enabled = !employee || !!selectedOrgId

  return useQuery({
    queryKey: ["sample", "lookup", employee ? selectedOrgId : "self"],
    enabled,
    staleTime: 1000 * 60 * 60 * 6,     // 6 hours
    gcTime: 1000 * 60 * 60 * 24,       // 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,    
    queryFn: () => {
      if (!employee) return sampleService.sampleLookup(params)
      return sampleService.sampleLookupForOrg(selectedOrgId!, params)
    },
  })
}
