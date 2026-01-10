import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { FileRoomListItem } from '@/api/types/file-room'
import { Route } from '@/routes/app/files'

export interface IProps {
  id: string | null
  fileList: FileRoomListItem[]
}

export interface INavigationItem {
  folderId: string | null
  name: string
}

export function FolderPath({ id, fileList }: IProps) {
  const getNavigationPath = (nodeId: string | null | undefined): INavigationItem[] => {
    const path: INavigationItem[] = []

    if (nodeId === null || nodeId === undefined) {
      return path
    }

    const index = fileList.findIndex((item) => item.id === nodeId)
    if (index >= 0) {
      const navItem: INavigationItem = {
        folderId: fileList[index].id,
        name: fileList[index].name,
      }
      path.push(navItem)
      const result = getNavigationPath(fileList[index].parentId)
      path.unshift(...result)
    }
    return path
  }

  const navigationPath = useMemo(() => {
    return getNavigationPath(id)
  }, [id, fileList])

  return (
    <div>
      {navigationPath.length ? (
        <>
          <Link
            to={Route.to}
            search={{
              parentId: undefined,
            }}
          >
            <span>[My Files]</span>
          </Link>
          <span> | </span>
        </>
      ) : (
        <span>[My Files]</span>
      )}
      {navigationPath.map((item, index) => (
        <span key={item.folderId}>
          {index === 0 ? '' : ' | '}
          {index === navigationPath.length - 1 ? (
            item.name
          ) : (
            <Link
              to={Route.to}
              search={{
                parentId: item.folderId ?? undefined,
              }}
            >
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}
