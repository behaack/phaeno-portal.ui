import { lazy, useMemo, useRef, useState } from "react";
import { JobTypesList, JobStatusList } from "@/api/types/job-pipeline"
import { PButton, PSelect } from "@/shared/ui/components";
import { PDivider } from "@/shared/ui/components/layout";
import { useGetJobs } from "@/api/hooks/job-pipeline.hooks";
import { JobListIndex } from "./components/JobListIndex";
import { CreateJobModal, IHandles } from "./CreateJob.Modal";
import { emptyPagedList } from "@/shared/types/IPagedList";
import { Surface, Text } from "@/shared/ui/primiatives";
import { IconMath } from "@tabler/icons-react";
import { SelectCustomerMessage } from "../_common/SelectCustomerMessage";
import { authSession } from "@/auth/auth.session";
import { useImpersonationStore } from "@/stores/impersonation.store";

export function AnalyticsIndexPage() {
  const impersonationStore = useImpersonationStore()
  const [jobType, setType] = useState("Report")
  const [jobStatus, setStatus] = useState("Queued")
  const jobRef = useRef<IHandles>(null)
  const { data } = useGetJobs({ jobType, jobStatus, page: 1})
  const FormComponent = lazy(() => import('./forms/ReportForm'))

  const createJobHndl = () => {
    jobRef.current?.open()
  }

  const mayViewData = useMemo(() => {
    if (authSession.isCustomer()) return true
    if (authSession.isPhaeno()) {
      return (!!impersonationStore.selectedCustomerId)
    }
    return !true
  }, [impersonationStore.selectedCustomerId])  

  return (
    <Surface className="p-5" fullHeight elevation="sm" hover="none">
      <Text className="flex gap-3 items-center mb-6" variant="heading"><IconMath />Data Analytics</Text>
      {(mayViewData) ? (        
        <div>
          <CreateJobModal 
            ref={jobRef}
            title={`Create ${jobType} Job`}
            >
            <FormComponent onClose={() => jobRef.current?.close()} />
          </CreateJobModal>
          <PSelect
            label="Job Type"
            placeholder="Pick value"
            allowDeselect={false}
            data={JobTypesList}
            value={jobType}
            onChange={(value) => setType(value ?? "")}
          />

          <PSelect
            label="Status"
            placeholder="Pick value"
            allowDeselect={false}
            data={JobStatusList}
            value={jobStatus}
            onChange={(value) => setStatus(value ?? "")}
          />        

          <div className="text-right">
            <PButton my={10} onClick={createJobHndl} >Create Job</PButton>
          </div>
          <PDivider my={10}/>
          <JobListIndex data={data || emptyPagedList}  />
        </div>
      ) : (
        <SelectCustomerMessage />
      )}        
    </Surface>
  );
}