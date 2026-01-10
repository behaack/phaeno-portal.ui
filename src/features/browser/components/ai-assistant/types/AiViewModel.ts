import { ESqlAiEntityType } from '@/api/types/ai-assistant'

export type AiViewModel =
  | {
      kind: 'table'
      title?: string | null
      columns: string[]
      rows: any[]
      nextCursor: string | null
      entityType: ESqlAiEntityType
    }
  | {
      kind: 'metric'
      title?: string | null
      metric: { value: string | number; label?: string }
      nextCursor: null
      entityType: ESqlAiEntityType
    }
