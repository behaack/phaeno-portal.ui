import { IconUsers } from '@tabler/icons-react'
import { useGetUsersForCustomer } from '@/api/hooks/userHooks'
import { PButton } from '@/shared/ui/components/inputs'
import { Text } from '@/shared/ui/primiatives'
import { UserTable } from './components/UserTable'
import { IconUser } from '@tabler/icons-react'
import { AddEditUserModal, IHandles } from './AddEditUser.Modal'
import { useRef } from 'react'

export interface IProps {
  organizationId: string | undefined
}

export function UserListForOrg({ organizationId }: IProps) {
  const addForm = useRef<IHandles>(null)
  const results = useGetUsersForCustomer({ q: '', page: 1, limit: 30 }, organizationId)

  if (results.isLoading) return <div>Loading...</div>

  const addUser = () => {
    if (organizationId)
      addForm.current?.add(organizationId)
  }

  return (
    <div>
      <AddEditUserModal ref={addForm}/>
      <div className="flex items-center justify-between">
        <Text className="flex gap-3 items-center mb-6" variant="subheading">
          <IconUsers size={15} /> Users
        </Text>
        <PButton 
          variant="outline" 
          rightSection={<IconUser size={16}/>}
          onClick={addUser} 
        >
          Add
        </PButton>
      </div>
      <UserTable list={results.data?.list} />
    </div>
  )
}
