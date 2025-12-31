import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { transcriptService } from "@/api/services/transcript.service"
import type { GenomicListParams } from "@/api/types/genomic.common"
import { useImpersonationStore } from "@/stores/impersonation.store"
import { useAuthStore } from "@/stores/auth.store" // or wherever your roles live
import { isPhaenoEmployee } from "@/auth/types/auth.guards"
import { LookupListParams } from "../types/common"

export function useTranscriptLookup(params: LookupListParams) {
  const roles = useAuthStore((s) => s.userAccount?.roles) // adapt to your auth store
  const employee = isPhaenoEmployee(roles)

  const selectedOrgId = useImpersonationStore((s) => s.selectedCustomerId)

  // customer => enabled
  // employee => enabled only after selecting org
  const enabled = !employee || selectedOrgId !== null

  return useQuery({
    queryKey: ["transcript", "lookup", employee ? selectedOrgId : "self", params.q],
    enabled,
    queryFn: () => {
      if (!employee) return transcriptService.lookup(params)
      return transcriptService.lookupForOrganization(params, selectedOrgId!)
    },
  })
}

export function useTranscriptList(params: GenomicListParams) {
  const roles = useAuthStore((s) => s.userAccount?.roles)
  const employee = isPhaenoEmployee(roles)
  const selectedOrgId = useImpersonationStore((s) => s.selectedCustomerId)

  const enabled = !employee || !!selectedOrgId

  return useQuery({
    queryKey: [
      "transcript",
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
      if (!employee) return transcriptService.list(params)
      return transcriptService.listForOrganization({ organizationId: selectedOrgId!, ...params })
    },
  })
}

export function useTranscriptDetails(id: string | null | undefined) {
  return useQuery({
    queryKey: ["transcript", "details", id ?? null],
    enabled: !!id,
    queryFn: () => transcriptService.get(id!),
  })
}
