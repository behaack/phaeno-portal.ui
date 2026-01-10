import { useRef } from "react";
import { Route } from "@/routes/app/customers/$id"
import { useGetCustomer, useUpdateCustomer } from "@/api/hooks/customer.hooks";
import { Surface, Text } from "@/shared/ui/primiatives";
import { toOrganizationKeyValuePairs } from "./helpers/toOrganizationKeyValuePairs";
import { KeyValueList } from "@/shared/ui/components/compound";
import { IconBuilding } from "@tabler/icons-react";
import { PDivider } from "@/shared/ui/components/layout";
import { PActionIcon } from "@/shared/ui/components/inputs";
import { IconEdit } from "@tabler/icons-react";
import { PToolTip } from "@/shared/ui/components/feedback";
import { UserListForOrg } from "../users/UserListForOrg";
import { AddEditCustomerModal, IHandles } from "./AddEditCustomer.Modal";

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
    <AddEditCustomerModal ref={editForm}/>
    <div className="flex items-center justify-between">
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconBuilding /> Customer Details</Text>
      <PToolTip label="Edit customer details">
        <PActionIcon radius="xl" size="input-md" onClick={editCustomerHndl}><IconEdit size={21}/></PActionIcon>
      </PToolTip>
    </div>
    <KeyValueList items={toOrganizationKeyValuePairs(results.data!)} />
    <PDivider my={20} size="md" />
    <UserListForOrg organizationId={results.data?.id!} />
  </Surface>
  );
}
