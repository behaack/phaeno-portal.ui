import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { IconBuilding, IconSearch } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { ILookupItem } from '@/assets/interfaces/_index';
import { InputDataList, PModalDialog } from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { useAuthStore } from '@/stores/authStore';
import { NIL } from 'uuid';
import { useBrowserStore } from '@/stores/browserStore';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Route as BrowserRoute} from '@/routes/browser/index';

export interface IProps {}

export interface IHandles {
  open: () => void;
}

const ModalUserSelector = forwardRef<IHandles, IProps>((_props, ref) => {
  const db = useDatabase();
  const authStore = useAuthStore();
  const browserStore = useBrowserStore();
  const navigate = useNavigate()
  const routerState = useRouterState();
  const [opened, setOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [data, setData] = useState<ILookupItem[]>([]);


  useImperativeHandle(ref, () => ({
    open() {
      intializeForm();
    },
  }));

  useEffect(() => {
    getData(searchValue);
  }, [searchValue]);

  const getData = (search: string) => {
    const url = `organizations/customers/lookup?search=${search}`;
    db.httpGet<ILookupItem[]>(url, true).then((response) => {
      if (response.success) {
        if (response.data) {
          setData(response.data);
        }
      }
    });
  };

  const intializeForm = () => {
    getData('');
    setSearchValue('');
    setOpened(true);
  };

  const searchValueChangeHndl = (value: string) => {
    setSearchValue(value);
  };

  const selectHndl = (value: ILookupItem | null) => {
    if (value) {
      authStore.setSelectedOrganization(value);
      setOpened(false);
      getSampleData(value);
      browserStore.resetAllStores();
      if (routerState.location.pathname === BrowserRoute.to) {
        const searchValues = routerState.location.search;
        navigate({
          to: BrowserRoute.to,
          search: {
            subject: searchValues.subject || 'transcript',
            sampleid: searchValues.sampleid || NIL,
            pageno: 1,
            direction: searchValues.direction || 'next',
          },
        });           
      }
    }
  };
  
  const getSampleData = (org: ILookupItem) => {    
    db.httpGet<ILookupItem[]>(`samples/${org.value}`, true).then(response => {
      if (response.success) {
        if (response.data) {
          const data = [{
              value: NIL,
              label: '<All Samples>'
            },
            ...response.data
          ]
          authStore.setSamples(data)
        }
      }
    })
  }

  return (
    <PModalDialog
      title="Select Organization"
      opened={opened}
      onClose={() => setOpened(false)}
      size="lg"
      icon={<IconBuilding size={21} />}
      hideFooter
      top
    >
      <InputDataList
        data-autofocus
        searchValue={searchValue}
        onSearchValueChange={searchValueChangeHndl}
        leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
        //@ts-ignore
        onSelect={selectHndl}
        clearButton
        data={data}
        mah={400}
        mih={400}
      />
    </PModalDialog>
  );
});

export default ModalUserSelector;
