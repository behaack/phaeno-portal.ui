import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { jobPipelineService } from "../services/job-pipeline.service"
import { GetJobsParams } from "../types/job-pipeline";

export function useGetJobs({
  jobType,
  jobStatus,
  page,
  pageSize = 30,
}: GetJobsParams) {
  const enabled = Boolean(jobType) && Boolean(jobStatus) && page > 0 && pageSize > 0;

  return useQuery({
    queryKey: ["job-pipeline", "jobs", { jobType, jobStatus, page, pageSize }],
    enabled,
    queryFn: () => jobPipelineService.getJobs({jobType, jobStatus, page, pageSize}),
    placeholderData: keepPreviousData
  });
}
