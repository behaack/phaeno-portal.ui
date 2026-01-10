import { useRef } from 'react'
import { IconBuilding, IconEdit } from '@tabler/icons-react'
import { useGetCustomer } from '@/api/hooks/customer.hooks'
import { Route } from '@/routes/app/customers/$id'
import { KeyValueList } from '@/shared/ui/components/compound'
import { PToolTip } from '@/shared/ui/components/feedback'
import { PActionIcon } from '@/shared/ui/components/inputs'
import { PDivider } from '@/shared/ui/components/layout'
import { Surface, Text } from '@/shared/ui/primiatives'
import { UserListForOrg } from '../users/UserListForOrg'
import { AddEditCustomerModal, IHandles } from './AddEditCustomer.Modal'
import { toOrganizationKeyValuePairs } from './helpers/toOrganizationKeyValuePairs'

export function CustomerDetailsPage() {
  const { id } = Route.useParams()
  const editForm = useRef<IHandles>(null)
  const results = useGetCustomer(id)

  if (results.isLoading) return <div>Loading...</div>

  const editCustomerHndl = () => {
    editForm.current?.edit(results.data!)
  }

  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <AddEditCustomerModal ref={editForm} />
      <div className="flex items-center justify-between">
        <Text className="flex gap-3 items-center mb-6" variant="heading">
          <IconBuilding /> Customer Details
        </Text>
        <PToolTip label="Edit customer details">
          <PActionIcon radius="xl" size="input-md" onClick={editCustomerHndl}>
            <IconEdit size={21} />
          </PActionIcon>
        </PToolTip>
      </div>
      <KeyValueList items={toOrganizationKeyValuePairs(results.data!)} />
      <PDivider my={20} size="md" />
      <UserListForOrg organizationId={results.data?.id!} />
    </Surface>
  )
}
