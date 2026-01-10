import { ERenderType, ESqlAiEntityType, type AiAssistResponse } from '@/api/types/ai-assistant'
import { FastaDetailsItem } from '@/api/types/fasta'
import { TranscriptListItem } from '@/api/types/transcript'
import { FastaTable } from '../fasta/FastaTable'
import { TranscriptTable } from '../transcript/TranscriptTable'
import { AggregationMetric } from './AggregationMetric'
import { AggregationTable } from './AggregationTable'

export interface MetricResult {
  value: unknown
  label?: string
}

export interface AiAssistResultsProps {
  result: AiAssistResponse | null
  rows: any[]
}

export function AiAssistResults({ result, rows }: AiAssistResultsProps) {
  if (!result) return null

  const { entityType, renderType, columns, results } = result

  // Metric
  if (renderType === ERenderType.Metric) {
    if (!isMetricResult(results)) return

    const value = results.value
    const label = results.label ?? 'Value'
    return <AggregationMetric label={label} value={value} />
  }

  // Aggregation table
  if (entityType === ESqlAiEntityType.Aggregate) {
    return <AggregationTable rows={rows} columns={columns ?? []} />
  }

  // Fasta / Transctipt tables
  if (entityType === ESqlAiEntityType.Fasta) {
    return <FastaTable data={rows as FastaDetailsItem[]} forAllSamples />
  }

  if (entityType === ESqlAiEntityType.Transcript) {
    return <TranscriptTable data={rows as TranscriptListItem[]} forAllSamples />
  }

  return null
}

function isMetricResult(x: unknown): x is MetricResult {
  return typeof x === 'object' && x !== null && 'value' in x
}
