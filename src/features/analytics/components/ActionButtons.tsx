import { useEffect, useMemo, useRef } from "react";
import { IconEye } from "@tabler/icons-react";
import { IconCancel } from "@tabler/icons-react";
import { DataPipelineItem } from "@/api/types/job-pipeline";
import { PActionIcon } from "@/shared/ui/components/inputs";
import { PToolTip } from "@/shared/ui/components/feedback/index"

export interface IProps {
  job: DataPipelineItem;
}

export function ActionButtons({ job }: IProps) {
  const cancelJobHndl = (job: DataPipelineItem) => {
  }

  const isCanceled = useMemo(() => {
    return false
  }, [])

  return (
    <div className="flex gap-1 justify-center">
      <PToolTip label="View details" openDelay={500}>
        <PActionIcon 
          variant="filled" 
          size="sm" 
          radius="xl" 
          aria-label="Transcript details"
        >
          <IconEye size="1em" />
        </PActionIcon>
      </PToolTip>
      {(job.status === "Queued" || job.status === "Started") && (
        <PToolTip disabled={isCanceled} label="Cancel Job" openDelay={500}>
          <PActionIcon 
            variant="filled" 
            color="red"
            size="sm" 
            radius="xl" 
            aria-label="Transcript details"
            disabled={isCanceled}
            onClick={() => cancelJobHndl(job)}
          >
            <IconCancel size="1em" />
          </PActionIcon>
        </PToolTip>
      )}
    </div>
  );
}