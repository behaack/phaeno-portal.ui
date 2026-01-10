import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiKeyService } from '../services/api-keys.service'
import { ApiKeyDetails, ApiKeyListItem } from '../types/api-keys'
import { PagedListParams } from '../types/common'

export function useGetApiKey(id?: string) {
  return useQuery({
    queryKey: ['api-key', 'details', id],
    enabled: Boolean(id),
    retry: 1,
    queryFn: () => apiKeyService.getApiKey(id!),
  })
}

export function useGetApiKeys(params: PagedListParams) {
  return useQuery({
    queryKey: ['api-key', 'list', { q: params.q, page: params.page, limit: params.limit }],
    retry: 1,
    placeholderData: keepPreviousData,
    queryFn: () => apiKeyService.getApiKeys(params),
  })
}

export function useAddApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (req: ApiKeyDetails): Promise<ApiKeyListItem> => apiKeyService.addApiKey(req),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['api-key', 'list'] }),
  })
}

export function useUpdateApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (req: ApiKeyDetails): Promise<ApiKeyListItem> => apiKeyService.updateApiKey(req),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['api-key', 'list'] }),
  })
}
