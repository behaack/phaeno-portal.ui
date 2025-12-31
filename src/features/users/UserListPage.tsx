import { useState } from 'react';
import { useGetCustomers } from '@/api/hooks/customer.hooks';
import { PSearchInput } from '@/shared/ui/components/compound';
import { CustomerTable } from './components/UserTable';
import { Surface, Text } from '@/shared/ui/primiatives';
import { IconBuilding } from '@tabler/icons-react';

export function UserListPage() {
  const [q, setQ] = useState("")
  const results = useGetCustomers({q: q, page: 1, limit: 35})
  return (
    <Surface className="p-8" fullHeight>
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconBuilding /> Customers</Text>
      <PSearchInput placeholder="Start typing to search for customer" value={q} onChange={setQ} />
      <div className="mt-5">
        <CustomerTable list={results.data?.list ?? []} />
      </div>
    </Surface>
  );
}
