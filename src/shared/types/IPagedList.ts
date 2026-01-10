export interface IPagedList<T> {
  list: T[]
  pageCount: number
  pageNumber: number
  rowsReturned: number
  totalRowCount: number
}

export const emptyPagedList = {
  list: [],
  pageCount: 0,
  pageNumber: 0,
  rowsReturned: 0,
  totalRowCount: 0,
}
