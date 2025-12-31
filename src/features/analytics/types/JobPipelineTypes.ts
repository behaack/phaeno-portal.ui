export const JOB_TYPES = ['Report', 'Score', 'Summary', 'Umap'] as const;
export const STATUS_TYPES = ['Queued', 'Started', 'Completed', 'Failed', 'Canceled'] as const;
export type TJobType = typeof JOB_TYPES[number];
export type TStatusType = typeof STATUS_TYPES[number];

export interface IDataPipelineItem {
  id: string;
  organizationId: string;
  userId: string;
  pipelineName: string;
  jobType: TJobType
  status: TStatusType;
  submittedAt: string;
  startedAt: string;
  completedAt: string;
  paramsJson: string;
  metricsJson: string;
  artifactsJson: string;
  errorMessage: string;
}

// forms/types.ts
import { JSX } from "react"
import { ZodSchema } from "zod"

export interface IJobFormContract<T> {
  schema: ZodSchema<T>
  Component: (props: { onSubmit: (values: T) => void }) => JSX.Element
}