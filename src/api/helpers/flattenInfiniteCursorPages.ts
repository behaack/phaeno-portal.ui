import { CursorPage } from '../types/paging'

export function flattenInfiniteCursorPages<T>(data: { pages: CursorPage<T>[] } | undefined): T[] {
  if (!data?.pages?.length) return []
  return data.pages.flatMap((p: any) => p.items ?? p.data ?? p.results ?? [])
}
