import { useRef, useState } from 'react';
import { useGetCustomers } from '@/api/hooks/customer.hooks';
import { PSearchInput } from '@/shared/ui/components/compound';
import { CustomerTable } from './components/CustomerTable';
import { Surface, Text } from '@/shared/ui/primiatives';
import { IconBuilding } from '@tabler/icons-react';
import { PButton } from '@/shared/ui/components';
import { AddEditCustomerModal, IHandles } from './AddEditCustomer.Modal';

export function CustomerIndexPage() {
  const addModal = useRef<IHandles>(null)
  const [q, setQ] = useState("")
  const results = useGetCustomers({q: q, page: 1, limit: 35})

  const addOrganization = () => {
    addModal.current?.add()
  }  

  return (
    <Surface className="p-8" fullHeight>
      <AddEditCustomerModal ref={addModal} />
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconBuilding />Customers</Text>
      <div className="flex justify-between mb-1">
        <PSearchInput placeholder="Search" loading={results.isFetching} value={q} onChange={setQ} />
        <PButton 
          variant="outline"
          rightSection={<IconBuilding size={16} />} 
          onClick={addOrganization}
        >
          Add
        </PButton>
      </div>
      {(results.isLoading && !results.data)
        ? <div className='text-center'>Loading...</div>
        : <CustomerTable list={results.data?.list!} />
      }
    </Surface>
  );
}
