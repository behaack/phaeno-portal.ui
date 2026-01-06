export const JobTypesList = 
  ['Report', 'Score', 'Summary', 'Umap'] as const;
  
export const JobStatusList = 
  ['Queued', 'Started', 'Completed', 'Failed', 'Canceled'] as const;

export const JobType = {
  Report: JobTypesList[0],
  Score: JobTypesList[1],
  Summary: JobTypesList[2],
  Umap: JobTypesList[3]
}

export const JobStatusType = {
  Queued: JobStatusList[0],
  Started: JobStatusList[1],
  Completed: JobStatusList[2],
  Failed: JobStatusList[3],
  Canceled: JobStatusList[4],
} as const;

export type JobType = typeof JobTypesList[number];

export type JobStatusType = typeof JobStatusType[keyof typeof JobStatusType];

export type JobStatusTypeWithStopping = JobStatusType | "Stopping"

export type DataPipelineItem = {
  id: string;
  organizationId: string;
  userId: string;
  pipelineName: string;
  jobType: JobType
  status: JobStatusType;
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
  q?: string
  page: number;
  pageSize?: number;
};

export type CreateUmapJob = {
  jobName: string,
  h5adPath: string,
  nNeighbors: number,
  minDist: number
}

export type CreateSummaryJob = {
  jobName: string,
  h5adPath: string
}

export type CreateScoreJob = {
  jobName: string,
  h5adPath: string
}

export type CreateReportJob = {
  jobName: string,
  h5adPath: string,
  outFile: string
}

