import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

export interface IAnalyticsStoreState {
  canceledJobs: string[]
  requestCancel: (jobId: string) => void
  cancelJob: (jobId: string) => void
}

export const useAnalyticsStore = create<IAnalyticsStoreState>()(
  devtools(
    persist(
      (set) => ({
        canceledJobs: [],
        requestCancel: (jobId: string) => {
          set((s) => ({
            canceledJobs: [...s.canceledJobs, jobId],
          }))
        },
        cancelJob: (jobId: string) => {
          set((s) => ({
            canceledJobs: s.canceledJobs.filter((j) => j !== jobId),
          }))
        },
      }),
      {
        name: 'analytics-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
)
