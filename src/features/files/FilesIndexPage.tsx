import { useMemo } from 'react'
import { IconFile } from '@tabler/icons-react'
import { useFileRoomContents } from '@/api/hooks/file-room.hooks'
import { authSession } from '@/auth/auth.session'
import { Route } from '@/routes/app/files'
import { Surface, Text } from '@/shared/ui/primiatives'
import { useImpersonationStore } from '@/stores/impersonation.store'
import { CanViewData } from '../_common/CanViewData'
import { FileRoomTable } from './components/FileRoomTable'
import { FolderPath } from './components/FolderPath'

export function FilesIndexPage() {
  const search = Route.useSearch()
  const parentId: string | null = search.parentId ?? null
  const impersonationStore = useImpersonationStore()
  const results = useFileRoomContents()

  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <Text className="flex gap-3 items-center mb-6" variant="heading">
        <IconFile />
        Files
      </Text>
      <FolderPath fileList={results.data!} id={parentId} />
      <CanViewData>
        {results.isLoading && !results.data ? (
          <div className="text-center">Loading...</div>
        ) : (
          <FileRoomTable list={results.data!} />
        )}
      </CanViewData>
    </Surface>
  )
}
