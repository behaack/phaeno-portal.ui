import { authSession } from "@/auth/auth.session";
import { useMemo } from "react";
import { useImpersonationStore } from "@/stores/impersonation.store";

export interface Props {
  children: React.ReactNode
}

export function CanViewData({ children }: Props) {
  const impersonationStore = useImpersonationStore()

  const mayViewData = useMemo(() => {
    if (authSession.isPhaeno()) {
      return (!!impersonationStore.selectedCustomerId)
    }
    return true
  }, [authSession.isPhaeno(), impersonationStore.selectedCustomerId])  

  return (
    <div>
      { children }
      {/* {(mayViewData)
        ? (
        <div className="mt-10 font-semibold text-center rounded-[var(--radius-md)] border border-[oklch(var(--error)/0.25)] bg-[oklch(var(--error)/0.10)] px-3 py-3 text-sm">
          To view data, select a customer to impersonate from the dropdown menu
        </div>
        ) : children
      } */}
    </div>
  )
}