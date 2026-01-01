import { useRef, useState } from 'react';
import { PSearchInput } from '@/shared/ui/components/compound';
import { Surface, Text } from '@/shared/ui/primiatives';
import { UserTable } from './components/UserTable';
import { useGetUsersForOwnOrg } from '@/api/hooks/userHooks';
import { PButton } from '@/shared/ui/components';
import { AddUserModal, IHandles } from './components/AddUser.Modal';
import { IconUsers, IconUser } from '@tabler/icons-react';

export function UserListPage() {
  const addForm = useRef<IHandles>(null)
  const [q, setQ] = useState("")
  const results = useGetUsersForOwnOrg({q: q, page: 1, limit: 35})

  const addUser = () => {
    addForm.current?.open("")
  }

    if (results.isLoading) return <div>Loading...</div>

  return (
    <Surface className="p-8" fullHeight>
      <AddUserModal ref={addForm} />
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconUsers />Users</Text>
      <PSearchInput placeholder="Start typing to search for customer" value={q} onChange={setQ} />
      <div className="mt-5">
        <div className="flex justify-end">
          <PButton rightSection={<IconUser size={16} />} onClick={addUser}>
            Add
          </PButton>
        </div>
        <UserTable list={results.data?.list!} />
      </div>
    </Surface>
  );
}

