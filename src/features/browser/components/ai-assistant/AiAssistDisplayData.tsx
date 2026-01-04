import { FastaListItem } from "@/api/types/fasta"
import { TranscriptListItem } from "@/api/types/transcript"
import { useMemo, useState } from "react"
import { AggregationMetric } from "./AggregationMetric"
import { AggregationTable } from "./AggregationTable"
import { TranscriptTable } from "../transcript/Table"
import { FastaTable } from "../fasta/Table"
import { ERenderType, ESqlAiEntityType, AiAssistResponse } from "@/api/types/ai-assistant"

export interface Props {
  result: AiAssistResponse | null
}

export function AiAssistDisplayData({ result }: Props) {
  const [fastaList, setFastaList] = useState<FastaListItem[]>([])
  const [transcriptList, setTranscriptList] = useState<TranscriptListItem[]>([])
  const [aggList, setAggList] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [title, setTitle] = useState<string>("")

  const showFastaData = useMemo(() => {
    return result?.entityType === ESqlAiEntityType.Fasta;
  }, [result?.entityType])

  const showTranscriptData = useMemo(() => {
    return result?.entityType === ESqlAiEntityType.Transcript;
  }, [result?.entityType])  

  const showAggregateList = useMemo(() => {
    return (result?.entityType === ESqlAiEntityType.Aggregation && result?.renderType === ERenderType.Table);
  }, [result?.entityType])    

  const showAggregateMetric = useMemo(() => {
    return (result?.entityType === ESqlAiEntityType.Aggregation && result?.renderType === ERenderType.Metric);
  }, [result?.entityType])
  
  // const activeList = useMemo(() => {
  //   if (showFastaData) {
  //     return fastaList
  //   }
  //   if (showTranscriptData) {
  //     return transcriptList
  //   }
  //   if (showAggregateList || showAggregateMetric) {
  //     return aggList
  //   }
  //   return null        
  // }, [result?.entityType])       
    
  return (
    <div>
      {(showFastaData) && (
        <FastaTable
          data={fastaList}
          forAllSamples 
        />
      )}
      {(showTranscriptData) && (
        <TranscriptTable
          data={transcriptList}
          forAllSamples 
        />
      )}
      {(showAggregateList) && (
        <AggregationTable 
          rows={aggList}
          columns={columns}
        />
      )}      
      {(showAggregateMetric) && (
        <AggregationMetric 
          title={title}
          rows={aggList}
          columns={columns}
        />
      )}   
    </div>
  )
}