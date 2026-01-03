import { useQuery } from "@tanstack/react-query"
import { fileRoomService } from "@/api/services/fileRoom.service"

export function useFileRoomContentsForSelf() {
  return useQuery({
    queryKey: ["file-room", "list", 'own'],
    queryFn: () => {
      return fileRoomService.getFileRoomForSelf()
    },
  })
}