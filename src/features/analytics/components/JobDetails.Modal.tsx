import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { IconMath } from "@tabler/icons-react";
import { PModalDialog } from "@/shared/ui/modals";
import { DataPipelineItem } from "@/api/types/job-pipeline";
import { KeyValueList } from "@/shared/ui/components/compound";
import { toJobKeyValuePairs } from "../helpers/toJobKeyValuePairs";

export interface IHandles {
  open: (job: DataPipelineItem) => void;
}

export const JobDetailsModal = forwardRef<IHandles>((_, ref) => {
  const jobRef = useRef<DataPipelineItem | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open(job: DataPipelineItem) {
      jobRef.current = job
      setIsOpen(true)  
    },
  }));  

  //if (jobRef.current === null) return null

  return (
    <PModalDialog 
      title="Job Details" 
      icon={<IconMath size={21} />} 
      opened={isOpen} 
      onClose={() => setIsOpen(false)}
      size="xl"
    >
      <KeyValueList items={toJobKeyValuePairs(jobRef.current!)} />
    </PModalDialog>
  )
})