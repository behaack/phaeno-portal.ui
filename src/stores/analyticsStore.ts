import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { notifications } from '@mantine/notifications';
import { statusColorMapper } from '@/assets/utils/statusColorMapper';
import { emptyPagedList, IDataPipelineItem, IPagedList } from '@/assets/interfaces/_index';

export interface IAnalyticsStoreState {
  canceledJobs: IDataPipelineItem[];
  dataPipelineItem: IDataPipelineItem | null;
  dataPipelinePagedList: IPagedList<IDataPipelineItem>;
  setDataPipelineItem: (dataPipelineItem: IDataPipelineItem | null) => void;
  setdataPipelinePagedList: (dataPipelinePagedList: IPagedList<IDataPipelineItem>) => void;
  appendData: (newItems: IDataPipelineItem[]) => void;
  setPageNumber: (page: number) => void;
  updateJobStatus: (job: IDataPipelineItem) => void;
  cancelJob: (job: IDataPipelineItem) => void;
}

export const useAnalyticsStore = create<IAnalyticsStoreState>()(
  devtools(
    persist(
      (set) => ({
        canceledJobs: [],
        dataPipelineItem: null,
        dataPipelinePagedList: emptyPagedList,

        setDataPipelineItem: (dataPipelineItem) => {
          set(
            produce<IAnalyticsStoreState>((state) => {
              state.dataPipelineItem = dataPipelineItem;
            })
          );
        },

        setdataPipelinePagedList: (dataPipelinePagedList) => {
          set(
            produce<IAnalyticsStoreState>((state) => {
              state.dataPipelinePagedList = dataPipelinePagedList;
            })
          );
        },

        appendData: (items) => {
          set(
            produce<IAnalyticsStoreState>((state) => {
              const existingIds = new Set(state.dataPipelinePagedList.list.map(j => j.id))
              items.forEach(i => {
                if (!existingIds.has(i.id)) {
                  state.dataPipelinePagedList.list.push(i)
                }
              })
            })
          );
        },

        setPageNumber: (page) => {
          set(
            produce<IAnalyticsStoreState>((state) => {
              state.dataPipelinePagedList.pageNumber = page;
            })
          );
        },

        updateJobStatus: (job) => {
          set(
            produce<IAnalyticsStoreState>((state) => {
              // remove from cancel list, if there
              const cancelList= state.canceledJobs;
              const cancelListIndex = cancelList.findIndex(item => item.id === job.id);
              if (cancelListIndex >= 0) {
                cancelList.splice(cancelListIndex, 1)
              }

              // update status
              const jobList = state.dataPipelinePagedList.list;
              const jobListIndex = jobList.findIndex((j) => j.id === job.id);
              if (jobListIndex === -1) return;

              const last = jobList[jobListIndex].status;
              jobList[jobListIndex] = job;

              if (last !== job.status) {
                notifications.show({
                  color: statusColorMapper(job.status),
                  title: 'Job Status Change',
                  message: `${job.pipelineName} is now ${job.status}`,
                  autoClose: true,
                });
              }
            })
          );
        },

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
