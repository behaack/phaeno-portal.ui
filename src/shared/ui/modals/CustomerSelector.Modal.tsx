import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { IconBuilding, IconSearch } from '@tabler/icons-react'
import { Combobox, Paper, ScrollArea, useCombobox } from '@mantine/core'
import { useCustomerLookup } from '@/api/hooks/customer.hooks'
import { PTextInput } from '@/shared/ui/components/inputs'
import { PBox } from '@/shared/ui/components/layout'
import { PModalDialog } from '@/shared/ui/modals/PModalDialog'
import { useImpersonationStore } from '@/stores/impersonation.store'

export interface IHandles {
  open: () => void
}

export const CustomerSelector = forwardRef<IHandles>((_, ref) => {
  const store = useImpersonationStore()
  const [opened, setOpened] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [customer, setCustomer] = useState<string | null>(null)
  const result = useCustomerLookup({ q: searchValue, limit: 50 })

  const combobox = useCombobox({
    opened: true,
  })

  const intializeForm = () => {
    setOpened(true)
    setSearchValue('')
    setCustomer(store.selectedCustomerId)
  }

  useImperativeHandle(ref, () => ({
    open() {
      intializeForm()
    },
  }))

  const list = useMemo(() => {
    return result.data ?? []
  }, [result.data])

  const customerSelection = (id: string | null) => {
    let custName: string | null = null
    if (id) {
      const index = list.findIndex((item) => item.value === id)
      custName = index < 0 ? null : list[index].label
    }
    store.setSelectedCustomer(id, custName)
    setOpened(false)
  }

  return (
    <PModalDialog
      title="Select Customer"
      opened={opened}
      onClose={() => setOpened(false)}
      size="lg"
      icon={<IconBuilding size={21} />}
    >
      <div className="py-3 px-5">
        <Combobox
          store={combobox}
          onOptionSubmit={(val) => {
            customerSelection(val)
          }}
        >
          <Combobox.Target>
            <PTextInput
              label="Pick value or type anything"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.currentTarget.value)
                combobox.updateSelectedOptionIndex()
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
      </div>
    </PModalDialog>
  )
})
