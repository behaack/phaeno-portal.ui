export default interface ITranscript {
  id: number;
  sampleName: string;
  transcript_id: string;
  gene_id: string | null;
  gene_symbol: string | null;
  sequence: string | null;
  definition_line: string | null;
}
