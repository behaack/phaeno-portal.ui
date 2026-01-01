import { Route } from "@/routes/app/users/$id"
import { Surface, Text } from "@/shared/ui/primiatives";
import { KeyValueList } from "@/shared/ui/components/compound";
import { PActionIcon } from "@/shared/ui/components/inputs";
import { IconEdit, IconUser } from "@tabler/icons-react";
import { PToolTip } from "@/shared/ui/components/feedback";
import { useGetUser } from "@/api/hooks/userHooks";
import { AddEditUserModal, IHandles } from "./AddEditUser.Modal";
import { useRef } from "react";
import { toUserKeyValuePairs } from "./helpers/toUserKeyValuePairs";

export function UserDetailsPage() {
  const userForm = useRef<IHandles>(null)
  const { id } = Route.useParams()
  const result = useGetUser(id)

  if (result.isLoading) return <div>Loading...</div>

  const editUserHndl = () => {
    userForm.current?.edit(result.data!)
  }

  const resendInvite = () => {
    console.log("EMAIL")
  }

  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <AddEditUserModal ref={userForm} />
      <div className="flex items-center justify-between mb-6">
        <Text className="flex gap-3 items-center" variant="heading"><IconUser /> User Details</Text>
        <PToolTip label="Edit customer details">
          <PActionIcon radius="xl" size="input-md" onClick={editUserHndl}>
            <IconEdit size={21}/>
          </PActionIcon>
        </PToolTip>
      </div>
      <KeyValueList items={toUserKeyValuePairs({
        user: result.data!, 
        onSendEmail: () => resendInvite()
      })} />
    </Surface>
  );
}
