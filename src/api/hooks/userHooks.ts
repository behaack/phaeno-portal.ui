import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query"
import { LookupListParams, PagedListParams } from "../types/common"
import { userService } from "@/api/services/user.service"

export function useGetUsersForOwnOrg(params: PagedListParams) {
  return useQuery({
    queryKey: ["users", "list", { q: params.q, page: params.page }],
    retry: 1,    
    placeholderData: keepPreviousData,
    queryFn: () => {
      return userService.getUserForOwnOrg(params)
    },
  })
}

export function useGetUsersForCustomer(params: PagedListParams, id?: string) {
  return useQuery({
    queryKey: ["users", "list", { id, q: params.q, page: params.page, limit: params.limit }],
    retry: 1,
    placeholderData: keepPreviousData,
    enabled: Boolean(id),
    queryFn: () => userService.getUsersForCustomer(params, id),
  });
}

export function useGetUser(id: string) {
  return useQuery({
    queryKey: ["user", "details", { id }],
    retry: 1,    
    queryFn: () => {
      return userService.getUser(id)
    },
  })
}

export const userByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["users", "detail", id],
    queryFn: () => userService.getUser(id),
    enabled: Boolean(id),
    staleTime: 30_000,
  });