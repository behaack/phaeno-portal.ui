import { IPagedList } from '@/shared/types/IPagedList'
import { api } from '../core/api-call'
import { PagedListParams, toPagedListQueryParams } from '../types/common'
import { UserDetails, UserListItem } from '../types/user'

export const userService = {
  getUserForOwnOrg: (params: PagedListParams) =>
    api.get<IPagedList<UserListItem>>('/user/for-self', {
      params: toPagedListQueryParams(params),
    }),

  getUsersForCustomer: (params: PagedListParams, id?: string) =>
    api.get<IPagedList<UserListItem>>(`/user/for-organization/${id}`, {
      params: toPagedListQueryParams(params),
    }),

  getUser: (id: string) => api.get<UserDetails>(`/user/${id}`),

  addUser: (body: UserDetails) => {
    return api.post<UserDetails, UserListItem>('user', body)
  },

  updateUser: (body: UserDetails) => {
    return api.put<UserDetails, UserListItem>('user', body)
  },
}
