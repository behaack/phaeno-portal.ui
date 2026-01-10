import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAnalyticsStore } from '@/stores/analytics.store'
import { jobPipelineService } from '../services/job-pipeline.service'
import {
  CreateReportJob,
  CreateScoreJob,
  CreateSummaryJob,
  CreateUmapJob,
  DataPipelineItem,
  GetJobsParams,
} from '../types/job-pipeline'

export const pipelineRunsKey = (jobType: string, status?: string, q?: string) =>
  ['job-pipeline', 'jobs', jobType, status ?? '', q] as const

export function useGetJobs({ jobType, jobStatus, page, q, pageSize = 30 }: GetJobsParams) {
  return useQuery({
    queryKey: pipelineRunsKey(jobType!, jobStatus, q),
    queryFn: () => jobPipelineService.getJobs({ jobType, jobStatus, page, pageSize, q }),
    refetchInterval: 5 * 60 * 1000, // FIVE MINUTES
    placeholderData: keepPreviousData,
  })
}

export function useCreateUmapJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (job: CreateUmapJob): Promise<DataPipelineItem> =>
      jobPipelineService.createUmapJob(job),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['job-pipeline', 'jobs'] })
    },
  })
}

export function useCreateReportJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (job: CreateReportJob): Promise<DataPipelineItem> =>
      jobPipelineService.createReportJob(job),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['job-pipeline', 'jobs'] })
    },
  })
}

export function useCreateSummaryJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (job: CreateSummaryJob): Promise<DataPipelineItem> =>
      jobPipelineService.createSummaryJob(job),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['job-pipeline', 'jobs'] })
    },
  })
}

export function useCreateScoreJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (job: CreateScoreJob): Promise<DataPipelineItem> =>
      jobPipelineService.createScoreJob(job),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['job-pipeline', 'jobs'] })
    },
  })
}

export function useCancelJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string): Promise<unknown> => jobPipelineService.cancelJob(id),
    onSuccess: (_, id) => {
      useAnalyticsStore.getState().requestCancel(id)
    },
  })
}
