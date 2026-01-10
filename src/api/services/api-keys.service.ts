import { IPagedList } from "@/shared/types/IPagedList";
import { api } from "../core/api-call";
import { ApiKeyDetails, ApiKeyListItem } from "../types/api-keys";
import { PagedListParams, toPagedListQueryParams } from "../types/common";

export const apiKeyService = {
  getApiKey: (id: string) =>
    api.get<ApiKeyDetails>(`api-key/${id}`),

  getApiKeys: (params: PagedListParams) => {
    return api.get<IPagedList<ApiKeyListItem>>("api-key", {
      params: toPagedListQueryParams(params),
    });
  },

  updateApiKey: (body: ApiKeyDetails) => {
    return api.put<ApiKeyListItem, ApiKeyDetails>("api-key", body);
  },

  addApiKey: (body: ApiKeyDetails) => {
    return api.post<ApiKeyListItem, ApiKeyDetails>("api-key", body);
  },
};
