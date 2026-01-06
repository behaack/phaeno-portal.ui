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

export const StatusType = {
  Queued: JobStatusList[0],
  Started: JobStatusList[1],
  Completed: JobStatusList[2],
  Failed: JobStatusList[3],
  Canceled: JobStatusList[4],
} as const;

export type JobType = typeof JobTypesList[number];

export type StatusType = typeof StatusType[keyof typeof StatusType];

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

