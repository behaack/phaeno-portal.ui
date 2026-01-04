export type CursorPage<T> = {
  items: T[]
  nextCursor: string | null
}

export const emptyCursorPage = {
  items: [],
  nextCursor: null
}