import { Route } from "@/routes/app/users/$id"
import { Surface, Text } from "@/shared/ui/primiatives";
import { toUserKeyValuePairs } from "./helpers/toUserKeyValuePairs";
import { KeyValueList } from "@/shared/ui/components/compound";
import { PActionIcon } from "@/shared/ui/components/inputs";
import { IconEdit, IconUser } from "@tabler/icons-react";
import { PToolTip } from "@/shared/ui/components/feedback";
import { useGetUser } from "@/api/hooks/userHooks";

export function UserDetailsPage() {
  const { id } = Route.useParams()
  const result = useGetUser(id)

  if (result.isLoading) return <div>Loading...</div>

  return (
    <main>
      <section>
        <Surface className="p-5" fullHeight elevation="sm" hover="none">
          <div className="flex items-center justify-between">
            <Text className="flex gap-3 items-center mb-6" variant="heading"><IconUser /> User Details</Text>
            <PToolTip label="Edit customer details">
              <PActionIcon radius="xl" size="input-md"><IconEdit size={21}/></PActionIcon>
            </PToolTip>
          </div>
          <KeyValueList items={toUserKeyValuePairs(result.data!)} />
        </Surface>
      </section>
    </main>
  );
}
