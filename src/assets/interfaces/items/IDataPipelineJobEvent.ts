import { TJobType, TStatusType } from "@/assets/types/types";
import IDataPipelineItem from "./IDataPipelineItem";

export default interface IDataPipelineJobEvent {
  jobId: string;
  eventType: TJobType;
  metricsJson: string;
  pipeline: string;
  status: TStatusType;
  timestamp: string;
  errorMessage: string;
  pipelineRun: IDataPipelineItem
}