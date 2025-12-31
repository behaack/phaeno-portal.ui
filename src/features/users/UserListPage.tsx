import { useRef, useState } from 'react';
import { PSearchInput } from '@/shared/ui/components/compound';
import { Surface, Text } from '@/shared/ui/primiatives';
import { IconBuilding } from '@tabler/icons-react';
import { UserTable } from './components/UserTable';
import { useGetUsersForOwnOrg } from '@/api/hooks/userHooks';
import { PButton } from '@/shared/ui/components';
import { IHandles, UserModal } from './UserModal';

export function UserListPage() {
  const userForm = useRef<IHandles>(null)
  const [q, setQ] = useState("")
  const results = useGetUsersForOwnOrg({q: q, page: 1, limit: 35})

  const addUser = () => {
    userForm.current?.open()
  }

    if (results.isLoading) return <div>Loading...</div>

  return (
    <Surface className="p-8" fullHeight>
      <UserModal ref={userForm}/>
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconBuilding />Users</Text>
      <PSearchInput placeholder="Start typing to search for customer" value={q} onChange={setQ} />
      <div className="mt-5">
        <div className="flex justify-end">
          <PButton rightSection={<IconBuilding size={16} />} onClick={addUser}>
            Add
          </PButton>
        </div>
        <UserTable list={results.data?.list!} />
      </div>
    </Surface>
  );
}

