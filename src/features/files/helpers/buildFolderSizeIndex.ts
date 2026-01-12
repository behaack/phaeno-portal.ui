import { FileRoomListItem } from '@/api/types/file-room'

/**
 * ✅ Recursive folder size:
 * sums ALL descendant files (not folders) under folderId.
 * Runs in O(n) preprocessing, then O(1) lookup.
 */
export function buildFolderSizeIndex(items: FileRoomListItem[]): Map<string, number> {
  const childrenByParent = new Map<string, FileRoomListItem[]>()
  for (const item of items) {
    const pid = item.parentId ?? '__root__'
    const arr = childrenByParent.get(pid) ?? []
    arr.push(item)
    childrenByParent.set(pid, arr)
  }

  const memo = new Map<string, number>()

  const dfs = (folderId: string): number => {
    if (memo.has(folderId)) return memo.get(folderId)!
    const children = childrenByParent.get(folderId) ?? []

    let sum = 0
    for (const child of children) {
      if (child.isFolder) sum += dfs(child.id)
      else sum += child.sizeBytes
    }

    memo.set(folderId, sum)
    return sum
  }

  // Only compute for folders (optional, but nice)
  for (const item of items) {
    if (item.isFolder) dfs(item.id)
  }

  return memo
}