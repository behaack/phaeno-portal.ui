import { useQuery } from '@tanstack/react-query'
import { fileRoomService } from '@/api/services/file-room.service'
import { isPhaenoEmployee } from '@/auth/types/auth.guards'
import { useAuthStore } from '@/stores/auth.store'
import { useImpersonationStore } from '@/stores/impersonation.store'

export function useFileRoomContents() {
  const roles = useAuthStore((s) => s.userAccount?.roles)
  const employee = isPhaenoEmployee(roles)
  const selectedOrgId = useImpersonationStore((s) => s.selectedCustomerId)

  // customer => enabled
  // employee => enabled only after selecting org
  const enabled = !employee || !!selectedOrgId

  return useQuery({
    queryKey: ['file-room', 'list', 'own'],
    enabled,
    queryFn: () => {
      if (!employee) return fileRoomService.getFileRoomForSelf()
      return fileRoomService.getFileRoomForOrg(selectedOrgId!)
    },
  })
}
