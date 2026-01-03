import { CursorPage } from "../types/paging"

export function getNextCursor<T>(page: CursorPage<T>): string | undefined {
  // Try common shapes. Replace with the exact property name if you know it.
  const anyPage = page as any
  return (
    anyPage.nextCursor ??
    anyPage.next ??
    anyPage.cursorNext ??
    anyPage.nextPageCursor ??
    undefined
  )
}

