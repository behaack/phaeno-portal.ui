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
import { IconList } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'

export function CustomerDetailsPage() {
  const { id } = Route.useParams()
  const editForm = useRef<IHandles>(null)
  const results = useGetCustomer(id)
  const navigate = useNavigate()

  if (results.isLoading) return <div>Loading...</div>

  const editCustomerHndl = () => {
    editForm.current?.edit(results.data!)
  }

  const customerListHndl = () => {
    navigate({
      to: '/app/customers'
    })
  }

  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <AddEditCustomerModal ref={editForm} />
      <div className="flex items-center justify-between">
        <Text className="flex gap-3 items-center mb-6" variant="heading">
          <IconBuilding /> Customer Details
        </Text>
        <div className="flex gap-1">
          <PToolTip label="Return to customer list">
            <PActionIcon variant="outline" radius="xl" size="input-md" onClick={customerListHndl}>
              <IconList size={21} />
            </PActionIcon>
          </PToolTip>          
          <PToolTip label="Edit customer details">
            <PActionIcon variant="outline" radius="xl" size="input-md" onClick={editCustomerHndl}>
              <IconEdit size={21} />
            </PActionIcon>
          </PToolTip>
        </div>
      </div>
      <KeyValueList items={toOrganizationKeyValuePairs(results.data!)} />
      <PDivider my={20} size="md" />
      <UserListForOrg organizationId={results.data?.id} />
    </Surface>
  )
}
