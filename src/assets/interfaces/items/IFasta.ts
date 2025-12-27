export default interface IFasta {
  id: number;
  sampleName: string
  definition_line: string;
  sequence: string;
  seq_id: string;
  comment: string;
  smid: string;
  num_fragments: number | null;
  chunk: number | null;
  mate_pair: number | null;
  read_number: number | null;
  strand: number | null;
  strand_discriminator: number | null;
  frag_start_array: string;
  frag_len_array: string;
}
