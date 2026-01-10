import { api } from '../core/api-call'
import type {
  AiAssistNextPageRequest,
  AiAssistResponse,
  NaturalLangRequest,
} from '../types/ai-assistant'
import { enc } from '../types/common'

export const aiAssistantService = {
  runNaturalLanguage: (body: NaturalLangRequest) =>
    api.post<AiAssistResponse, NaturalLangRequest>('/ai-assistant/natural-lang-request', body),

  naturalLanguageRequestForOrg: (id: string, body: NaturalLangRequest) =>
    api.post<AiAssistResponse, NaturalLangRequest>(
      `/ai-assistant/natural-lang-request/${enc(id)}`,
      body
    ),

  nextPage: (body: AiAssistNextPageRequest) =>
    api.post<AiAssistResponse, AiAssistNextPageRequest>('/ai-assistant/next-page', body),

  nextPageForOrg: (id: string, body: AiAssistNextPageRequest) =>
    api.post<AiAssistResponse, AiAssistNextPageRequest>(`/ai-assistant/next-page/${enc(id)}`, body),
}
