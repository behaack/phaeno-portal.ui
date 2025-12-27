import { create } from "zustand"
import { persist } from "zustand/middleware"

type ImpersonationState = {
  // null = employee but not selected yet
  // string = selected customer org id
  selectedOrganizationId: string | null

  setSelectedOrganizationId: (id: string | null) => void
  clear: () => void
}

export const useImpersonationStore = create<ImpersonationState>()(
  persist(
    (set) => ({
      selectedOrganizationId: null,
      setSelectedOrganizationId: (id) => set({ selectedOrganizationId: id }),
      clear: () => set({ selectedOrganizationId: null }),
    }),
    {
      name: "phaeno.impersonation",
      // optional: only persist the selected org
      partialize: (s) => ({ selectedOrganizationId: s.selectedOrganizationId }),
    }
  )
)
