export default interface IGenomicList<T> {
  list: T[];
  nextId: number | null;
  cursor: string;
  rowsReturned: number;
  hasAdditional: boolean;
}

export const emptyGenomicsList = {
  list: [],
  nextId: null,
  cursor: '',
  rowsReturned: 0,
  hasAdditional: false
}
