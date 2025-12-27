import { useEffect, useMemo, useRef } from "react";
import { ActionIcon, Loader, Table, Tooltip } from '@mantine/core';
import { useAnalyticsStore } from "@/stores/analyticsStore";
import { IDataPipelineItem } from "@/assets/interfaces/_index";
import { IconEye } from "@tabler/icons-react";
import { IconCancel } from "@tabler/icons-react";
import { useDatabase } from "@/hooks/useDatabase";

export interface IProps {
  job: IDataPipelineItem;
}

export function ActionButtons({ job }: IProps) {
  const analyticsStore = useAnalyticsStore();
  const db = useDatabase();

  const cancelJobHndl = (job: IDataPipelineItem) => {
    db.httpPost<null, null>(`DataPipeline/cancel/${job.id}`, null, true).then(response => {
      if (response.success) {
        // analyticsStore.cancelJob(job);
      }
    })
  }

  const isCanceled = useMemo(() => {
    const index = analyticsStore.canceledJobs.findIndex(item => item.id === job.id);
    return index >= 0;
  }, [analyticsStore.canceledJobs.length, job])

  return (
    <div className="flex gap-1 justify-center">
      <Tooltip label="View details" openDelay={500}>
        <ActionIcon 
          variant="filled" 
          size="sm" 
          radius="xl" 
          aria-label="Transcript details"
        >
          <IconEye size="1em" />
        </ActionIcon>
      </Tooltip>
      {(job.status === "Queued" || job.status === "Started") && (
        <Tooltip disabled={isCanceled} label="Cancel Job" openDelay={500}>
          <ActionIcon 
            variant="filled" 
            color="red"
            size="sm" 
            radius="xl" 
            aria-label="Transcript details"
            disabled={isCanceled}
            onClick={() => cancelJobHndl(job)}
          >
            <IconCancel size="1em" />
          </ActionIcon>
        </Tooltip>
      )}
    </div>
  );
}