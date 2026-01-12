import { useEffect, useMemo, useState } from 'react'
import { IconChevronRight, IconFile, IconFolder } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { ActionIcon, Anchor, Badge, Group, Table, Text } from '@mantine/core'
import { FileRoomListItem } from '@/api/types/file-room'
import { Route } from '@/routes/app/files'
import { ListActionMenu } from '@/shared/ui/components/compound'
import { buildFolderSizeIndex } from '../helpers/buildFolderSizeIndex'
import { DisplayFileSize } from '@/shared/ui/components/compound/'
import { PButton, PCheckbox } from '@/shared/ui/components'
import { FolderPath } from './FolderPath'
import { IconDownload } from '@tabler/icons-react'

export interface IProps {
  list: FileRoomListItem[]
}

export function FileRoomTable({ list }: IProps) {
  const navigate = useNavigate()
  const search = Route.useSearch()
  const parentId: string | null = search.parentId ?? null
  
  // ---------------------------------------------------------------------------
  // SELECTION STATE
  // ---------------------------------------------------------------------------
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [allChecked, setAllChecked] = useState(false)

  // ---------------------------------------------------------------------------
  // FILTERED LIST (CURRENT FOLDER)
  // ---------------------------------------------------------------------------
  const filteredList = useMemo(() => list.filter((item) => item.parentId === parentId), [list, parentId])
  const visibleIds = useMemo(() => new Set(filteredList.map((r) => r.id)), [filteredList])
  const selectedVisibleCount = useMemo(() => {
    let count = 0
    for (const id of selected) {
      if (visibleIds.has(id)) count++
    }
    return count
  }, [selected, visibleIds])

  const allSelected = filteredList.length > 0 && selectedVisibleCount === filteredList.length   
  const noneSelected = selectedVisibleCount === 0
  const indeterminate = !noneSelected && !allSelected

  const toggleAll = (checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (checked) {
        for (const id of visibleIds) next.add(id)
      } else {
        for (const id of visibleIds) next.delete(id)
      }
      return next
    })
    setAllChecked(!allChecked)
  }

  const toggleOne = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  useEffect(() => {
    setAllChecked(allSelected)
  }, [allSelected])  

  // ---------------------------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------------------------
  const onNavigate = (id: string | null) => {
    toggleAll(false)
    setAllChecked(false)
    navigate({
      to: Route.to,
      search: {
        parentId: id ?? undefined,
      },
    })
  }

  // ---------------------------------------------------------------------------
  // PRECOMPUTED METADATA
  // ---------------------------------------------------------------------------
  const childrenCountById = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of list) {
      if (!item.parentId) continue
      map.set(item.parentId, (map.get(item.parentId) ?? 0) + 1)
    }
    return map
  }, [list])

  const folderSizeById = useMemo(() => buildFolderSizeIndex(list), [list])

  const downloadHndl = () => {
    console.log(selected)
    console.log(filteredList)
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <FolderPath fileList={list} id={parentId} />
        <PButton 
          variant="outline" 
          disabled={noneSelected && false} 
          leftSection={<IconDownload size={16} />}
          onClick={downloadHndl}
        >
          Download
        </PButton>
      </div>
      <Table withTableBorder withColumnBorders striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: 40 }}>
              <PCheckbox
                checked={allChecked}
                indeterminate={indeterminate}
                onChange={(e) => toggleAll(e.currentTarget.checked)}
                aria-label="Select all rows"
              />
            </Table.Th>

            <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>
              Name
            </Table.Th>

            <Table.Th
              style={{
                backgroundColor: 'black',
                color: 'white',
                width: 125,
                textAlign: 'right',
              }}
            >
              Size
            </Table.Th>

            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: 90 }}>
              Action
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {filteredList.map((item) => {
            const childCount = item.isFolder
              ? childrenCountById.get(item.id) ?? 0
              : 0

            const hasChildren = childCount > 0
            const sizeBytes = item.isFolder
              ? folderSizeById.get(item.id) ?? 0
              : item.sizeBytes

            const canNavigate = item.isFolder && hasChildren

            return (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <PCheckbox
                    checked={selected.has(item.id)}
                    onChange={(e) =>
                      toggleOne(item.id, e.currentTarget.checked)
                    }
                    aria-label={`Select row ${item.name}`}
                  />
                </Table.Td>

                <Table.Td>
                  <Group gap="xs" wrap="nowrap">
                    {item.isFolder ? (
                      <IconFolder size={18} />
                    ) : (
                      <IconFile size={18} />
                    )}

                    <Group gap="xs" wrap="nowrap">
                      {canNavigate ? (
                        <Anchor
                          component="button"
                          type="button"
                          onClick={() => onNavigate(item.id)}
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

                    {canNavigate && (
                      <ActionIcon
                        variant="subtle"
                        onClick={() => onNavigate(item.id)}
                        aria-label="Open folder"
                      >
                        <IconChevronRight size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                </Table.Td>

                <Table.Td style={{ textAlign: 'right' }}>
                  <DisplayFileSize value={sizeBytes} />
                </Table.Td>

                <Table.Td className="text-center">
                  <ListActionMenu
                    id={item.id}
                    showDetails
                    showDelete
                    onActionClick={() => {}}
                  />
                </Table.Td>
              </Table.Tr>
            )
          })}
        </Table.Tbody>
      </Table>
    </div>
  )
}
