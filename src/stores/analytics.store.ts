import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { notifications } from '@mantine/notifications';
import { DataPipelineItem } from '@/api/types/job-pipeline';

export interface IAnalyticsStoreState {
  canceledJobs: DataPipelineItem[];
  cancelJob: (job: DataPipelineItem) => void;
}

export const useAnalyticsStore = create<IAnalyticsStoreState>()(
  devtools(
    persist(
      (set) => ({
        canceledJobs: [],
        cancelJob: (job) => {
          set(
            produce<IAnalyticsStoreState>((state) => {
              if (!state.canceledJobs.some(j => j.id === job.id)) {
                state.canceledJobs.push(job)
              }
            })
          );
        },
      }),
      {
        name: 'analytics-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
