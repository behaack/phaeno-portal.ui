import { useMemo } from "react"
import { Surface, Text } from "@/shared/ui/primiatives";
import { IconFile } from "@tabler/icons-react";
import { useImpersonationStore } from "@/stores/impersonation.store";
import { authSession } from "@/auth/auth.session";
import { useFileRoomContents } from "@/api/hooks/file-room.hooks";
import { FileRoomTable } from "./components/FileRoomTable";
import { FolderPath } from "./components/FolderPath";
import { Route } from "@/routes/app/files"
import { CanViewData } from "../_common/CanViewData";

export function FilesIndexPage() {
  const search = Route.useSearch()
  const parentId: string | null = search.parentId ?? null  
  const impersonationStore = useImpersonationStore()
  const results = useFileRoomContents()

  const mayViewData = useMemo(() => {
    if (authSession.isPhaeno()) {
      return (!!impersonationStore.selectedCustomerId)
    }
    return true
  }, [authSession.isPhaeno(), impersonationStore.selectedCustomerId])  
    
  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconFile />Files</Text>
      <FolderPath fileList={results.data!} id={parentId}/>
      <CanViewData>
        {(results.isLoading && !results.data)
          ? <div className='text-center'>Loading...</div>
          : <FileRoomTable list={results.data!}/>
        }            
      </CanViewData>
    </Surface>
  )
}