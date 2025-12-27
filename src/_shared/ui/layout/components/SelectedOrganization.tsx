import { useRef } from 'react';
import { IconBuilding } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { EOrganizationType } from '@/assets/enums/_index';
import { useAuthStore } from '@/stores/authStore';
import ModalSelectOrganization, { IHandles } from './ModalOrgSelector';

export interface IProps {
  onSelectOrganization?: () => void;
}

export default function SelectedOrganization({ onSelectOrganization }: IProps) {
  const authStore = useAuthStore();
  const orgSelectorRef = useRef<IHandles>(null);

  const selectOrganizationHndl = () => {
    if (onSelectOrganization) {
      onSelectOrganization();
    }
    orgSelectorRef.current?.open();
  };

  return (
    <>
      {authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno ? (
        <div className="bg-zinc-600">
          <ModalSelectOrganization ref={orgSelectorRef} />
          <hr className="p-0 m-0" />
          <div className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-[9px]">Selected organization</div>
                <div className="text-xs">
                  {authStore.selectedOrganization
                    ? authStore.selectedOrganization?.label
                    : 'No organization selected'}
                </div>
              </div>
              <ActionIcon onClick={selectOrganizationHndl} radius="xl" size="md">
                <IconBuilding style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
