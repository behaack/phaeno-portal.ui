import { ESqlAiEntityType } from "@/api/types/ai-assistant"
import { AiViewModel } from "./types/AiViewModel"
import { TranscriptTable } from "../transcript/TranscriptTable"
import { FastaTable } from "../fasta/FastaTable"
import AggregateMetric from "../aggregate/AggregateMetric"
import AggregateTable from "../aggregate/AggregateTable"

const renderers = {
  [ESqlAiEntityType.Transcript]: {
    table: TranscriptTable,
  },
  [ESqlAiEntityType.Fasta]: {
    table: FastaTable,
  },
  [ESqlAiEntityType.Aggregate]: {
    table: AggregateTable,
    metric: AggregateMetric,
  },
} as const

export function AiResultBody({ vm }: { vm: AiViewModel }) {
  if (vm.kind === "metric") {
    const Metric = renderers[vm.entityType]?.metric
    return Metric ? <Metric title={vm.title ?? ""} value={vm.metric.value} /> : null
  }

  const Table = renderers[vm.entityType]?.table
  if (!Table) return null

  // Aggregation table expects (rows, columns); Transcript/Fasta may expect (data)
  if (vm.entityType === ESqlAiEntityType.Aggregate) {
    return <AggregateTable rows={vm.rows} columns={vm.columns} />
  }

  // For Transcript/Fasta, your existing components probably accept data: T[]
  return <Table data={vm.rows as any} forAllSamples />
}