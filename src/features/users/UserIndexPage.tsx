import { useRef, useState } from 'react'
import { IconUser, IconUsers } from '@tabler/icons-react'
import { useGetUsersForOwnOrg } from '@/api/hooks/userHooks'
import { authSession } from '@/auth/auth.session'
import { PButton } from '@/shared/ui/components'
import { PSearchInput } from '@/shared/ui/components/compound'
import { Surface, Text } from '@/shared/ui/primiatives'
import { AddEditUserModal, IHandles } from './AddEditUser.Modal'
import { UserTable } from './components/UserTable'

export function UserIndexPage() {
  const user = authSession.getUser()
  const addForm = useRef<IHandles>(null)
  const [q, setQ] = useState('')
  const results = useGetUsersForOwnOrg({ q: q, page: 1, limit: 35 })  

  const addUser = () => {
    if (user?.organizationId)
      addForm.current?.add(user?.organizationId)
  }

  return (
    <Surface className="p-8" fullHeight>
      <AddEditUserModal ref={addForm} />
      <Text className="flex gap-2 items-center mb-6" variant="heading">
        <IconUsers />
        Users
      </Text>
      <div className="flex justify-between mb-1">
        <PSearchInput loading={results.isFetching} placeholder="Search" value={q} onChange={setQ} />
        <PButton rightSection={<IconUser size={16} />} onClick={addUser} variant="outline">
          Add
        </PButton>
      </div>
      {results.isLoading && !results.data ? (
        <div className="text-center">Loading...</div>
      ) : (
        <UserTable list={results.data?.list} />
      )}
    </Surface>
  )
}
