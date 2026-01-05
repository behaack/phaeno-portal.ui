import { GenomicListParams } from "@/api/types/genomic.common"

export enum ERenderType {
  Table,
  Metric,
}

export enum ESqlAiEntityType {
  Aggregate,
  Fasta,
  Transcript
}

export interface NaturalLangRequest {
  requestString: string
  sampleId: string | null
}

export interface AiAssistNextPageRequest {
  queryId: string
  cursor: string | null
  limit: number
  pageNo: number
}


export type AiMetricResult = { 
  value: number | string; 
  label?: string 
}

export interface AiAssistResponse {
  entityType: ESqlAiEntityType
  renderType: ERenderType;
  queryId: string
  title: string | null;
  columns: string[]
  results: unknown
  nextCursor: string | null
  hasAdditional: boolean
}

