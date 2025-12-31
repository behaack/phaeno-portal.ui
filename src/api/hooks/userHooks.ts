import { useQuery } from "@tanstack/react-query"
import { LookupListParams, PagedListParams } from "../types/common"
import { userService } from "@/api/services/user.service"

export function useGetUsersForOwnOrg(params: PagedListParams) {
  return useQuery({
    queryKey: ["users", "list", { q: params.q, page: params.page }],
    retry: 1,    
    queryFn: () => {
      return userService.getUserForOwnOrg(params)
    },
  })
}

export function useGetUsersForCustomer(params: PagedListParams, id: string) {
  return useQuery({
    queryKey: ["users", "list", { q: params.q, page: params.page }],
    retry: 1,    
    queryFn: () => {
      return userService.getUsersForCustomer(params, id)
    },
  })
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