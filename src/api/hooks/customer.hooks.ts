import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { customerService } from '@/api/services/customer.service'
import { LookupListParams, PagedListParams } from '../types/common'
import { Organization } from '../types/organization'

export function useCustomerLookup(params: LookupListParams) {
  return useQuery({
    queryKey: ['organization', 'customer', 'lookup', params.q],
    staleTime: 1000 * 60 * 60 * 6, // 6 hours
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    retry: 1,
    queryFn: () => {
      return customerService.customerLookup(params)
    },
  })
}

export function useGetCustomers(params: PagedListParams) {
  return useQuery({
    queryKey: ['organization', 'customer', 'list', { q: params.q, page: params.page }],
    retry: 1,
    placeholderData: keepPreviousData,
    queryFn: () => {
      return customerService.getCustomers(params)
    },
  })
}

export function useGetCustomer(id: string) {
  return useQuery({
    queryKey: ['organization', 'customer', 'details', { id }],
    retry: 1,
    queryFn: () => {
      return customerService.getCustomer(id)
    },
  })
}

export function useAddCustomer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (req: Organization): Promise<Organization> => customerService.addOrganization(req),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['organization', 'customer', 'list'] }),
  })
}

export function useUpdateCustomer() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (req: Organization): Promise<Organization> =>
      customerService.updateOrganization(req),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['organization', 'customer'] }),
  })
}
