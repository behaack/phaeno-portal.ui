import { AiAssistResponse, ERenderType } from "@/api/types/ai-assistant"
import { AiViewModel } from "../types/AiViewModel"

export function toViewModel(r: AiAssistResponse | null): AiViewModel | null {
  if (!r) return null

  if (r.renderType === ERenderType.Metric) {
    const m = (r.results ?? {}) as any
    return {
      kind: "metric",
      title: r.title,
      metric: { value: m.value ?? m, label: m.label },
      nextCursor: null,
      entityType: r.entityType,
    }
  }

  // Table/list: results should be an array
  const rows = Array.isArray(r.results) ? (r.results as any[]) : []
  return {
    kind: "table",
    title: r.title,
    columns: r.columns ?? [],
    rows,
    nextCursor: r.nextCursor ?? null,
    entityType: r.entityType,
  }
}