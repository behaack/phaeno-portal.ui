import { lazy, Suspense, useRef, useState } from "react";
import { JobTypesList, JobType, JobStatusList } from "@/_api/types/job-pipeline"
import { PButton, PSelect } from "@/_shared/ui/components";
import { PDivider } from "@/_shared/ui/components/layout";
import { useGetJobs } from "@/_api/hooks/job-pipeline.hooks";
import { emptyPagedList } from "@/assets/interfaces/_index";
import { JobListIndex } from "./components/JobListIndex";
import { CreateJobModal, IHandles } from "./CreateJob.Modal";

export function AnalyticsPage() {
  const [jobType, setType] = useState("Report")
  const [jobStatus, setStatus] = useState("Queued")
  const jobRef = useRef<IHandles>(null)
  const result = useGetJobs({ jobType, jobStatus, page: 1})

  const createJobHndl = () => {
    jobRef.current?.open()
  }

  const FormComponent = lazy(() => import(/* @vite-ignore */ `./forms/${jobType}Form`))

  return (
    <main>
      <section>
        <CreateJobModal 
          ref={jobRef}
          title={`Create ${jobType} Job`}
          >
          <FormComponent onSubmit={() => {}}/>
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
        <JobListIndex data={result.data || emptyPagedList}  />
      </section>
    </main>
  );
}