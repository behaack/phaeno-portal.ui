import type { IPagedList } from "@/assets/interfaces/_index";
import { axiosInstance } from "../core/axios.instance";
import type { DataPipelineItem, GetJobsParams } from "../types/job-pipeline";

export const jobPipelineService = {
  submitJob: () => axiosInstance.post("data-pipeline-runs"),

  getJobs: ({ jobType, jobStatus, page, pageSize = 30 }: GetJobsParams) => 
    axiosInstance.get<IPagedList<DataPipelineItem>>("data-pipeline-runs", { 
      params: { jobType, jobStatus, page, pageSize } 
    }),
};