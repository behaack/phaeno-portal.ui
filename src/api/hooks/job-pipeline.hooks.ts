import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CreateReportJob, CreateScoreJob, CreateSummaryJob, CreateUmapJob, DataPipelineItem, GetJobsParams } from "../types/job-pipeline";
import { jobPipelineService } from "../services/job-pipeline.service";
import { useAnalyticsStore  } from "@/stores/analytics.store";

export const pipelineRunsKey = (jobType: string, status?: string) =>
  ["job-pipeline", "jobs", jobType, status ?? "all"] as const;

export function useGetJobs({
  jobType,
  jobStatus,
  page,
  pageSize = 30,
}: GetJobsParams) {
  const enabled = Boolean(jobType) && Boolean(jobStatus) && page > 0 && pageSize > 0;

  return useQuery({
    queryKey: pipelineRunsKey(jobType!, jobStatus),
    enabled,
    queryFn: () => jobPipelineService.getJobs({jobType, jobStatus, page, pageSize}),
    placeholderData: keepPreviousData
  });
}

export function useCreateUmapJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (job: CreateUmapJob): Promise<DataPipelineItem> => jobPipelineService.createUmapJob(job),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["job-pipeline","jobs"] })
    },
  })
}

export function useCreateReportJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (job: CreateReportJob): Promise<DataPipelineItem> => jobPipelineService.createReportJob(job),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["job-pipeline","jobs"] })
    },
  })
}

export function useCreateSummaryJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (job: CreateSummaryJob): Promise<DataPipelineItem> => jobPipelineService.createSummaryJob(job),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["job-pipeline","jobs"] })
    },
  })
}

export function useCreateScoreJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (job: CreateScoreJob): Promise<DataPipelineItem> => jobPipelineService.createScoreJob(job),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["job-pipeline","jobs"] })
    },
  })
}

export function useCancelJobMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string): Promise<unknown> => jobPipelineService.cancelJob(id),
    onSuccess: (_, id) => {
      useAnalyticsStore.getState().requestCancel(id)
    }
  })  
}