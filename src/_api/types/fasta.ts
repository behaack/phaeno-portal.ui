export type FastaListItem = {
  id: number // ulong -> number (safe up to 2^53-1)
  sampleName: string
  smid: string
  numFragments: number | null
  readNumber: number | null
  definitionLine: string
}

export type FastaDetailsItem = {
  id: number
  sampleName: string
  definitionLine: string
  sequence: string
  seqId: string
  comment: string
  smid: string
  numFragments: number | null
  chunk: number | null
  matePair: number | null
  readNumber: number | null
  strand: number | null
  strandDiscriminator: number | null
  fragStartArray: string
  fragLenArray: string
}
