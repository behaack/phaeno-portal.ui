import { useRef } from 'react';
import { IconBuilding } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useAuthStore } from '@/stores/auth.store';
import { useImpersonationStore } from '@/stores/impersonation.store';
import { CustomerSelector,  type IHandles } from '../../modals/CustomerSelector.Modal';

export interface IProps {
  onSelectCustomer?: () => void;
}

export function SelectedCustomer({ onSelectCustomer }: IProps) {
  const impersonationStore = useImpersonationStore();
  const orgSelectorRef = useRef<IHandles>(null);
  
  const selectOrganizationHndl = () => {
    if (onSelectCustomer) {
      onSelectCustomer();
    }
    orgSelectorRef.current?.open();
  };

  return (
    <div>
      <div className="bg-zinc-600">
        <CustomerSelector ref={orgSelectorRef} />
        <hr className="p-0 m-0" />
        <div className="p-3">
          <div className="flex justify-between items-center">
            <div className='text-white'>
              <div className="text-[9px]">Selected Customer</div>
              <div className="text-xs">
                {impersonationStore.selectedCustomerId
                  ? impersonationStore.selectedCustomerName
                  : 'No organization selected'}
              </div>
            </div>
            <ActionIcon onClick={selectOrganizationHndl} radius="xl" size="md">
              <IconBuilding style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </div>
        </div>
      </div>
    </div>
  );
}
