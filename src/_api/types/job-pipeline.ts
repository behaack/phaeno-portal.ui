export const JobTypesList = 
  ['Report', 'Score', 'Summary', 'Umap'] as const;
export const JobStatusList = 
  ['Queued', 'Started', 'Completed', 'Failed', 'Canceled'] as const;

export type JobType = typeof JobTypesList[number];

export type StatusType = typeof JobStatusList[number];

export type DataPipelineItem = {
  id: string;
  organizationId: string;
  userId: string;
  pipelineName: string;
  jobType: JobType
  status: StatusType;
  submittedAt: string;
  startedAt: string;
  completedAt: string;
  paramsJson: string;
  metricsJson: string;
  artifactsJson: string;
  errorMessage: string;
}

export type GetJobsParams = {
  jobType?: string;
  jobStatus?: string;
  page: number;
  pageSize?: number;
};




