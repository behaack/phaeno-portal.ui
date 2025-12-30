import type { IPagedList } from "@/assets/interfaces/_index";
import { axiosInstance } from "../core/axios.instance";
import type { CreateReportJob, CreateScoreJob, CreateSummaryJob, CreateUmapJob, DataPipelineItem, GetJobsParams } from "../types/job-pipeline";
import { api } from "../core/api-call";

export const jobPipelineService = {
  submitJob: () => axiosInstance.post("data-pipeline-runs"),

  getJobs: ({ jobType, jobStatus, page, pageSize = 30 }: GetJobsParams) => 
    api.get<IPagedList<DataPipelineItem>>("data-pipeline-runs", { 
      params: { jobType, jobStatus, page, pageSize } 
    }),

  createUmapJob: (job: CreateUmapJob) => 
    api.post<DataPipelineItem, CreateUmapJob>("data-pipelines/umap", job),

  createReportJob: (job: CreateReportJob) => 
    api.post<DataPipelineItem, CreateReportJob>("data-pipelines/umap", job),

  createScoreJob: (job: CreateScoreJob) => 
    api.post<DataPipelineItem, CreateScoreJob>("data-pipelines/umap", job),

  createSummaryJob: (job: CreateSummaryJob) => 
    api.post<DataPipelineItem, CreateSummaryJob>("data-pipelines/umap", job),
};