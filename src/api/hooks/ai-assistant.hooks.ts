import { isPhaenoEmployee } from "@/auth/types/auth.guards"
import { useAuthStore } from "@/stores/auth.store"
import { useImpersonationStore } from "@/stores/impersonation.store"
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { aiAssistantService } from "../services/ai-assistant.service"
import { type AiAssistResponse, type AiAssistNextPageRequest, NaturalLangRequest } from "../types/ai-assistant"

export function useAiAssistNaturalLangMutation() {
  const roles = useAuthStore((s) => s.userAccount?.roles)
  const employee = isPhaenoEmployee(roles)
  const selectedOrgId = useImpersonationStore((s) => s.selectedCustomerId)

  const enabled = !employee || !!selectedOrgId

  return useMutation({
    mutationKey: ["ai-assist", "nl", employee ? selectedOrgId : "self"],

    mutationFn: async (body: NaturalLangRequest) => {
      if (!employee) {
        return aiAssistantService.runNaturalLanguage(body)
      }
      if (!selectedOrgId) {
        throw new Error("Select an organization to run this request.")
      }
      return aiAssistantService.naturalLanguageRequestForOrg(selectedOrgId, body)
    },

    onMutate: () => {
      if (!enabled) throw new Error("Select an organization to run this request.")
    },
  })
}

export function useAiAssistInfinitePages(args: {
  queryId: string | null
  firstNextCursor: string | null // from the first response
  limit?: number
  enabled?: boolean
}) {
  const roles = useAuthStore((s) => s.userAccount?.roles)
  const employee = isPhaenoEmployee(roles)
  const selectedOrgId = useImpersonationStore((s) => s.selectedCustomerId)

  const limit = args.limit ?? 50

  // only enable when:
  // - we have a queryId
  // - org is selected if employee
  // - caller says enabled (e.g. not Metric)
  const enabled =
    (args.enabled ?? true) &&
    !!args.queryId &&
    (!employee || !!selectedOrgId)

  return useInfiniteQuery<AiAssistResponse>({
    queryKey: ["ai-assist", "pages", args.queryId, employee ? selectedOrgId : "self", limit] as const,
    enabled,

    // pageParam will be the cursor to request next page
    initialPageParam: args.firstNextCursor as string | null,

    queryFn: ({ pageParam }) => {
      const cursor = (pageParam as string | null) ?? null

      const body: AiAssistNextPageRequest = {
        queryId: args.queryId!,
        cursor, // <-- adjust name if your TS type is nextCursor instead
        limit,
      } as any

      if (!employee) return aiAssistantService.nextPage(body)
      return aiAssistantService.nextPageForOrg(selectedOrgId!, body)
    },

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

    refetchOnWindowFocus: false,
  })
}
