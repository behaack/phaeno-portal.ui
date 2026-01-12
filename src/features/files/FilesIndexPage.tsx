import { IconFile } from '@tabler/icons-react'
import { useFileRoomContents } from '@/api/hooks/file-room.hooks'
import { Surface, Text } from '@/shared/ui/primiatives'
import { CanViewData } from '../_common/CanViewData'
import { FileRoomTable } from './components/FileRoomTable'

export function FilesIndexPage() {
  const results = useFileRoomContents()
  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <Text className="flex gap-3 items-center mb-6" variant="heading">
        <IconFile />
        Files
      </Text>
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
