import { isPhaenoEmployee } from "@/auth/types/auth.guards"
import { useAuthStore } from "@/stores/auth.store"
import { useImpersonationStore } from "@/stores/impersonation.store"
import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { aiAssistantService } from "../services/ai-assistant.service"
import { type AiAssistResponse, NaturalLangRequest } from "../types/ai-assistant"

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

type PageParam =
  | { mode: "cursor"; cursor: string | null }
  | { mode: "page"; pageNo: number }

export function useAiAssistInfinitePages(opts: {
  queryId: string | null
  firstNextCursor: string | null
  limit: number
  enabled: boolean
  isAggregateTable: boolean
}) {
  const { queryId, firstNextCursor, limit, enabled, isAggregateTable } = opts

  return useInfiniteQuery<AiAssistResponse, Error, { pages: AiAssistResponse[] }, any, PageParam>({
    queryKey: ["aiAssist", "pages", queryId, limit, isAggregateTable ? "agg" : "cursor"],
    enabled: enabled && !!queryId,

    // page 2 param
    initialPageParam: isAggregateTable
      ? { mode: "page", pageNo: 2 }
      : { mode: "cursor", cursor: firstNextCursor },

    queryFn: ({ pageParam }) => {
      if (!queryId) throw new Error("Missing queryId")

      // aggregate paging
      if (pageParam.mode === "page") {
        return aiAssistantService.nextPage({
          queryId,
          cursor: "",           // unused by server for aggregates
          limit,
          pageNo: pageParam.pageNo,
        })
      }

      // cursor paging
      return aiAssistantService.nextPage({
        queryId,
        cursor: pageParam.cursor ?? "",
        limit,
        pageNo: 0,             // ignored by server for cursor lists
      })
    },

    getNextPageParam: (lastPage, allPages) => {
      // aggregate: drive by hasAdditional
      if (isAggregateTable) {
        return lastPage.hasAdditional
          ? { mode: "page", pageNo: allPages.length + 2 } // +2 because page 1 is firstPage
          : undefined
      }

      // cursor: drive by nextCursor
      return lastPage.nextCursor
        ? { mode: "cursor", cursor: lastPage.nextCursor }
        : undefined
    },
  })
}