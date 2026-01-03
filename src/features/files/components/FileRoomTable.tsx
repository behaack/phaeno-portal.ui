import { useMemo } from "react"
import { FileRoomListItem } from "@/api/types/file-room"
import { ListActionMenu } from "@/shared/ui/components/compound"
import { ActionIcon, Anchor, Badge, Group, Table, Text } from "@mantine/core"
import { IconChevronRight, IconFile, IconFolder } from "@tabler/icons-react"
import { Route } from "@/routes/app/files"
import { useNavigate } from "@tanstack/react-router"

export interface IProps {
  list: FileRoomListItem[]
}

export function FileRoomTable({ list }: IProps) {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const parentId: string | null = search.parentId ?? null

  const onNavigate = (id: string | null) => {
    navigate({
      to: Route.to,
      search: {
        parentId: id ?? undefined
      }
    })
  }

  const filteredList = useMemo(() => {
    return list.filter((item) => item.parentId === parentId)
  }, [list, parentId])

  // Precompute children counts for fast lookup
  const childrenCountById = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of list) {
      if (!item.parentId) continue
      map.set(item.parentId, (map.get(item.parentId) ?? 0) + 1)
    }
    return map
  }, [list])

  // Precompute recursive folder sizes (only sums file sizes)
  const folderSizeById = useMemo(() => {
    return buildFolderSizeIndex(list)
  }, [list])

  return (
    <div>
      <Table withTableBorder withColumnBorders striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ backgroundColor: "black", color: "white" }}>
              Name
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: "black",
                color: "white",
                width: "125px",
                textAlign: "right",
              }}
            >
              Size
            </Table.Th>
            <Table.Th style={{ backgroundColor: "black", color: "white", width: "90px" }}>
              Action
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {filteredList.map((item) => {
            const childCount = item.isFolder ? (childrenCountById.get(item.id) ?? 0) : 0
            const hasChildren = childCount > 0

            const sizeBytes = item.isFolder
              ? (folderSizeById.get(item.id) ?? 0)
              : item.sizeBytes

            const canNavigate = item.isFolder && hasChildren && !!onNavigate

            return (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Group gap="xs" wrap="nowrap">
                    {item.isFolder ? (
                      <IconFolder size={18} />
                    ) : (
                      <IconFile size={18} />
                    )}

                    {/* Name + children indicator */}
                    <Group gap="xs" wrap="nowrap">
                      {canNavigate ? (
                        <Anchor
                          component="button"
                          type="button"
                          onClick={() => onNavigate?.(item.id)}
                          style={{ textAlign: "left" }}
                        >
                          {item.name}
                        </Anchor>
                      ) : (
                        <Text>{item.name}</Text>
                      )}

                      {item.isFolder && hasChildren && (
                        <Badge size="sm" variant="light">
                          {childCount}
                        </Badge>
                      )}
                    </Group>

                    {/* Drill-down affordance */}
                    {canNavigate && (
                      <ActionIcon
                        variant="subtle"
                        onClick={() => onNavigate?.(item.id)}
                        aria-label="Open folder"
                      >
                        <IconChevronRight size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                </Table.Td>

                <Table.Td style={{ textAlign: "right" }}>
                  {formatBytes(sizeBytes, 1)}
                </Table.Td>

                <Table.Td className="text-center">
                  <ListActionMenu id={item.id} showDetails showDelete onActionClick={() => {}} />
                </Table.Td>
              </Table.Tr>
            )
          })}
        </Table.Tbody>
      </Table>
    </div>
  )
}

/**
 * ✅ Recursive folder size:
 * sums ALL descendant files (not folders) under folderId.
 * Runs in O(n) preprocessing, then O(1) lookup.
 */
export function buildFolderSizeIndex(items: FileRoomListItem[]): Map<string, number> {
  const childrenByParent = new Map<string, FileRoomListItem[]>()
  for (const item of items) {
    const pid = item.parentId ?? "__root__"
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

export function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes) return "0 B"

  const k = 1024 // ✅ most common for file sizes
  const sizes = ["B", "KB", "MB", "GB", "TB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)

  return `${value.toFixed(decimals)} ${sizes[i]}`
}
