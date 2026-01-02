import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { IconBuilding, IconSearch } from '@tabler/icons-react';
import { useImpersonationStore } from '@/stores/impersonation.store';
import { useRouterState } from '@tanstack/react-router';
import { PModalDialog }  from '@/shared/ui/modals/PModalDialog'
import { useCustomerLookup } from '@/api/hooks/customer.hooks';
import { Combobox, Paper, rem, ScrollArea, useCombobox } from '@mantine/core';
import { PTextInput } from '@/shared/ui/components/inputs';
import { PBox } from '@/shared/ui/components/layout';

export interface IProps {}

export interface IHandles {
  open: () => void;
}

export const CustomerSelector = forwardRef<IHandles, IProps>((_props, ref) => {
  const store = useImpersonationStore()
  const routerState = useRouterState();
  const [opened, setOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [customer, setCustomer] = useState<string | null>(null)
  const result = useCustomerLookup({ q: searchValue, limit: 50})

  const combobox = useCombobox({
    opened: true,
  });  

  useImperativeHandle(ref, () => ({
    open() {
      intializeForm();
    },
  }));
  
  const intializeForm = () => {
    setOpened(true);
    setSearchValue('');
    setCustomer(store.selectedCustomerId)
  };

  const list = useMemo(() => {
    return result.data ?? []
  }, [result.data])
  
  const customerSelection = (id: string | null) => {
    let custName: string | null = null
    if (id) {
      const index = list.findIndex(item => item.value === id) 
      custName = (index <0) ? null : list[index].label
    }
    store.setSelectedCustomer(id, custName);
    setOpened(false)
  }

  return (
    <PModalDialog
      title="Select Customer"
      opened={opened}
      onClose={() => setOpened(false)}
      size="lg"
      icon={<IconBuilding size={21} />}
      hideFooter
      top
    >
      <Combobox
        store={combobox}        
        onOptionSubmit={(val) => {
          customerSelection(val);
        }}
      >
        <Combobox.Target>
          <PTextInput
            label="Pick value or type anything"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.currentTarget.value);
              combobox.updateSelectedOptionIndex();
            }}
            leftSection={<IconSearch size={14} />}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            placeholder="Pick value or type anything"
            rightSection={<Combobox.Chevron />}
          />
        </Combobox.Target>

        <PBox>
          <Paper withBorder radius="md" mt="xs">
            <ScrollArea.Autosize mah={220}>
              <Combobox.Options>
                {list.length === 0 ? (
                  <Combobox.Empty>No results</Combobox.Empty>
                ) : (
                  list.map((item) => (
                    <Combobox.Option
                      key={item.value}
                      value={item.value}
                      active={item.value === customer}
                    >
                      {item.label}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </ScrollArea.Autosize>
          </Paper>
        </PBox>
      </Combobox>
    </PModalDialog>
  );
});