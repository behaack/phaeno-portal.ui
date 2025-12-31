import { lazy, Suspense, useRef, useState } from "react";
import { JobTypesList, JobType, JobStatusList } from "@/api/types/job-pipeline"
import { PButton, PSelect } from "@/shared/ui/components";
import { PDivider } from "@/shared/ui/components/layout";
import { useGetJobs } from "@/api/hooks/job-pipeline.hooks";
import { JobListIndex } from "./components/JobListIndex";
import { CreateJobModal, IHandles } from "./CreateJob.Modal";
import { emptyPagedList } from "@/shared/types/IPagedList";

export function AnalyticsPage() {
  const [jobType, setType] = useState("Report")
  const [jobStatus, setStatus] = useState("Queued")
  const jobRef = useRef<IHandles>(null)
  const { data } = useGetJobs({ jobType, jobStatus, page: 1})
  const FormComponent = lazy(() => import('./forms/ReportForm'))  //import(/* @vite-ignore */ `./forms/${jobType}Form`))

  const createJobHndl = () => {
    jobRef.current?.open()
  }

  return (
    <main>
      <section>
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
      </section>
    </main>
  );
}