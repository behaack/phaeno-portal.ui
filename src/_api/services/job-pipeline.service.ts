import type { IPagedList } from "@/assets/interfaces/_index";
import { axiosInstance } from "../core/axios.instance";
import type { DataPipelineItem, GetJobsParams } from "../types/job-pipeline";
import { api } from "../core/api-call";

export const jobPipelineService = {
  submitJob: () => axiosInstance.post("data-pipeline-runs"),

  getJobs: ({ jobType, jobStatus, page, pageSize = 30 }: GetJobsParams) => 
    api.get<IPagedList<DataPipelineItem>>("data-pipeline-runs", { 
      params: { jobType, jobStatus, page, pageSize } 
    }),
};