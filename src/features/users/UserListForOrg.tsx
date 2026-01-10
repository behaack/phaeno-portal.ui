import { IconPlus, IconUsers } from '@tabler/icons-react'
import { useGetUsersForCustomer } from '@/api/hooks/userHooks'
import { PToolTip } from '@/shared/ui/components/feedback'
import { PActionIcon } from '@/shared/ui/components/inputs'
import { Text } from '@/shared/ui/primiatives'
import { UserTable } from './components/UserTable'

export interface IProps {
  organizationId: string
}

export function UserListForOrg({ organizationId }: IProps) {
  const results = useGetUsersForCustomer({ q: '', page: 1, limit: 30 }, organizationId)

  if (results.isLoading) return <div>Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between">
        <Text className="flex gap-3 items-center mb-6" variant="subheading">
          <IconUsers size={15} /> Users
        </Text>
        <PToolTip label="Add user">
          <PActionIcon radius="xl" size="input-sm">
            <IconPlus size={18} />
          </PActionIcon>
        </PToolTip>
      </div>
      <UserTable list={results.data?.list!} />
    </div>
  )
}
