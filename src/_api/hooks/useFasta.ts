import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { fastaService } from "@/_api/services/fasta.service"
import type { GenomicListParams } from "@/_api/types/genomic.common"
import { useImpersonationStore } from "@/_stores/impersonation.store"
import { useAuthStore } from "@/_stores/auth.store" // or wherever your roles live
import { isPhaenoEmployee } from "@/_api/types/auth.guards"

export function useFastaLookup() {
  const roles = useAuthStore((s) => s.userAccount?.roles) // adapt to your auth store
  const employee = isPhaenoEmployee(roles)

  const selectedOrgId = useImpersonationStore((s) => s.selectedOrganizationId)

  // customer => enabled
  // employee => enabled only after selecting org
  const enabled = !employee || selectedOrgId !== null

  return useQuery({
    queryKey: ["fasta", "lookup", employee ? selectedOrgId : "self"],
    enabled,
    queryFn: () => {
      if (!employee) return fastaService.lookup()
      return fastaService.lookupForOrganization(selectedOrgId!)
    },
  })
}

export function useFastaList(params: GenomicListParams) {
  const roles = useAuthStore((s) => s.userAccount?.roles)
  const employee = isPhaenoEmployee(roles)
  const selectedOrgId = useImpersonationStore((s) => s.selectedOrganizationId)

  const enabled = !employee || !!selectedOrgId

  return useQuery({
    queryKey: [
      "fasta",
      "list",
      employee ? selectedOrgId : "self",
      params.sampleId ?? null,
      params.q ?? null,
      params.limit ?? 25,
      params.cursor ?? null,
    ],
    enabled,
    placeholderData: keepPreviousData,
    queryFn: () => {
      if (!employee) return fastaService.list(params)
      return fastaService.listForOrganization({ organizationId: selectedOrgId!, ...params })
    },
  })
}

export function useFastaDetails(id: string | null | undefined) {
  return useQuery({
    queryKey: ["fasta", "details", id ?? null],
    enabled: !!id,
    queryFn: () => fastaService.get(id!),
  })
}
