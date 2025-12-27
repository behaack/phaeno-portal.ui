export interface ISearch {
  subject: "transcript" | "fasta" | "natural-language";
  sampleid: string;
  pageno: number;
  direction: "next" | "prev";
  search?: string | undefined;
  cursorid?: number | null | undefined;
  cursorvalue?: string | undefined;
  hasadditional?: boolean | undefined;
}

export interface IBrowserProps {
  sampleId: string | undefined;
  searchValues: ISearch;
}
