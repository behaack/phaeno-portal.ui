import { DataPipelineItem } from "@/api/types/job-pipeline";
import { DisplayDateTime, DisplayTimeSpan } from "@/shared/ui/components/compound";

function safeParseJson(value: unknown) {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return { error: "Invalid JSON" };
    }
  }
  return value;
}

export function toJobKeyValuePairs(job: DataPipelineItem | null | undefined) {
  if (!job) return []; // ✅ ALWAYS return an array

  const parsedParams = safeParseJson(job.paramsJson);

  const parsedResults =
    !job.metricsJson || job.metricsJson === "output"
      ? null
      : safeParseJson(job.metricsJson);

  return [
    { label: "Job Id", value: job.id },
    { label: "Job Name", value: job.pipelineName },
    { label: "JobType", value: job.jobType },
    { label: "Status", value: job.status },
    { label: "Submitted On", value: <DisplayDateTime value={job.submittedAt} format="long-datetime" /> },
    { label: "Started On", value: <DisplayDateTime value={job.startedAt} format="long-datetime" /> },
    { label: "Completed On", value: <DisplayDateTime value={job.completedAt} format="long-datetime" /> },
    { label: "Run Time", value: <DisplayTimeSpan startValue={job.submittedAt} stopValue={job.completedAt} /> },
    {
      label: "Job Parameters",
      value: (
        <pre className="text-xs bg-muted p-3 rounded overflow-auto">
          {JSON.stringify(parsedParams, null, 2)}
        </pre>
      ),
    },
    {
      label: "Results",
      value: (
        <pre className="text-xs bg-muted p-3 rounded overflow-auto">
          {JSON.stringify(parsedResults, null, 2)}
        </pre>
      ),
    },
  ];
}
