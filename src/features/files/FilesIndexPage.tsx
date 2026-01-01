import { useMemo } from "react"
import { Surface, Text } from "@/shared/ui/primiatives";
import { SelectCustomerMessage } from "../_common/SelectCustomerMessage";
import { IconFile } from "@tabler/icons-react";
import { useImpersonationStore } from "@/stores/impersonation.store";
import { authSession } from "@/auth/auth.session";

export function FilesIndexPage() {
  const impersonationStore = useImpersonationStore()

  const mayViewData = useMemo(() => {
    if (authSession.isCustomer()) return true
    if (authSession.isPhaeno()) {
      return (!!impersonationStore.selectedCustomerId)
    }
    return !true
  }, [impersonationStore.selectedCustomerId])  
    
  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconFile />Files</Text>
      {(mayViewData) ? (  
        <div>
          Content Here...
        </div>   
      ) : (
        <SelectCustomerMessage />
      )}           
    </Surface>
  )
}