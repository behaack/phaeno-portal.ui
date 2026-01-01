import { useState } from 'react';
import { useGetCustomers } from '@/api/hooks/customer.hooks';
import { PSearchInput } from '@/shared/ui/components/compound';
import { CustomerTable } from './components/CustomerTable';
import { Surface, Text } from '@/shared/ui/primiatives';
import { IconBuilding } from '@tabler/icons-react';
import { PButton } from '@/shared/ui/components';

export function CustomerListPage() {
  const [q, setQ] = useState("")
  const results = useGetCustomers({q: q, page: 1, limit: 35})

  const addOrganization = () => {
    //addForm.current?.add(user?.organizationId!)
  }  

  return (
    <Surface className="p-8" fullHeight>
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconBuilding /> Customers</Text>
      <PSearchInput placeholder="Start typing to search for customer" loading={results.isFetching} value={q} onChange={setQ} />
      <div className="mt-5">
        <div className="flex justify-end mb-1">
          <PButton 
            rightSection={<IconBuilding size={16} />} 
            onClick={addOrganization}
          >
            Add
          </PButton>
        </div>
        {(results.isLoading && !results.data)
          ? <div className='text-center'>Loading...</div>
          : <CustomerTable list={results.data?.list ?? []} />
        }                
      </div>
    </Surface>
  );
}
