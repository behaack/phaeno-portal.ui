import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fastaService } from '@/api/services/fasta.service'
import type { GenomicListParams } from '@/api/types/genomic.common'
import { isPhaenoEmployee } from '@/auth/types/auth.guards'
import { useAuthStore } from '@/stores/auth.store' // or wherever your roles live
import { useImpersonationStore } from '@/stores/impersonation.store'
import { getNextCursor } from '../helpers/getNextCursor'
import { LookupListParams } from '../types/common'

/**
 * Infinite version of useFastaList.
 *
 * Pass in the same params you used before EXCEPT cursor.
 * TanStack Query will supply cursor via pageParam.
 */
export function useFastaInfiniteList(params: Omit<GenomicListParams, 'cursor'>) {
  const roles = useAuthStore((s) => s.userAccount?.roles)
  const employee = isPhaenoEmployee(roles)
  const selectedOrgId = useImpersonationStore((s) => s.selectedCustomerId)

  // customer => enabled
  // employee => enabled only after selecting org
  const enabled = !employee || !!selectedOrgId

  const limit = params.limit ?? 25

  return useInfiniteQuery({
    queryKey: [
      'fasta',
      'list:infinite',
      employee ? selectedOrgId : 'self',
      params.sampleId ?? null,
      params.q ?? null,
      limit,
    ] as const,

    enabled,

    // pageParam is the cursor. Start with null/"" based on how your API expects first page.
    initialPageParam: null as string | null,

    queryFn: ({ pageParam }) => {
      const cursor = (pageParam as string | null) ?? null

      if (!employee) return fastaService.list({ ...params, limit, cursor })

      return fastaService.listForOrganization({
        organizationId: selectedOrgId!,
        ...params,
        limit,
        cursor,
      })
    },

    // cursor-based continuation
    getNextPageParam: (lastPage) => getNextCursor(lastPage),

    // optional but usually good defaults:
    refetchOnWindowFocus: false,
    staleTime: 10_000,
  })
}

export function useFastaLookup(params: LookupListParams) {
  const roles = useAuthStore((s) => s.userAccount?.roles) // adapt to your auth store
  const employee = isPhaenoEmployee(roles)

  const selectedOrgId = useImpersonationStore((s) => s.selectedCustomerId)

  // customer => enabled
  // employee => enabled only after selecting org
  const enabled = !employee || selectedOrgId !== null

  return useQuery({
    queryKey: ['fasta', 'lookup', employee ? selectedOrgId : 'self', params.q],
    enabled,
    queryFn: () => {
      if (!employee) return fastaService.lookup(params)
      return fastaService.lookupForOrganization(params, selectedOrgId!)
    },
  })
}

/**
 * Paged list DEPRECATED
 */
export function useFastaList(params: GenomicListParams) {
  const roles = useAuthStore((s) => s.userAccount?.roles)
  const employee = isPhaenoEmployee(roles)
  const selectedOrgId = useImpersonationStore((s) => s.selectedCustomerId)

  const enabled = !employee || !!selectedOrgId

  return useQuery({
    queryKey: [
      'fasta',
      'list',
      employee ? selectedOrgId : 'self',
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
    queryKey: ['fasta', 'details', id ?? null],
    enabled: !!id,
    queryFn: () => fastaService.get(id!),
  })
}
