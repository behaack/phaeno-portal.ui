import { TJobType, TStatusType } from "@/assets/types/types";

export default interface IDataPipelineItem {
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
