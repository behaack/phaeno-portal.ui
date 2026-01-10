import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ImpersonationState = {
  // null = employee but not selected yet
  // string = selected customer org id
  selectedCustomerId: string | null
  selectedCustomerName: string | null

  setSelectedCustomer: (id: string | null, name: string | null) => void
  clear: () => void
}

export const useImpersonationStore = create<ImpersonationState>()(
  persist(
    (set) => ({
      selectedCustomerId: null,
      selectedCustomerName: null,
      setSelectedCustomer: (id, name) =>
        set({
          selectedCustomerId: id,
          selectedCustomerName: name,
        }),
      clear: () =>
        set({
          selectedCustomerId: null,
          selectedCustomerName: null,
        }),
    }),
    {
      name: 'impersonation.store',
      // optional: only persist the selected org
      partialize: (s) => ({
        selectedCustomerId: s.selectedCustomerId,
        selectedCustomerName: s.selectedCustomerName,
      }),
    }
  )
)
