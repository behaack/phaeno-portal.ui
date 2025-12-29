import { useEffect, useMemo, useRef, useState } from "react";
import { JobTypesList, JobType, JobStatusList } from "@/_api/types/job-pipeline"
import { PButton, PSelect } from "@/_shared/ui/components";
import { PDivider } from "@/_shared/ui/components/layout";
import { useGetJobs } from "@/_api/hooks/job-pipeline.hooks";
import { emptyPagedList } from "@/assets/interfaces/_index";
import { JobListIndex } from "./components/JobListIndex";

export function AnalyticsPage() {
  const [jobType, setType] = useState("")
  const [jobStatus, setStatus] = useState("")

  const result = useGetJobs({ jobType, jobStatus, page: 1})

  return (
    <main>
      <section>
        <PSelect
          label="Job Type"
          placeholder="Pick value"
          allowDeselect={false}
          data={JobTypesList}
          onChange={(value) => setType(value ?? "")}
        />

        <PSelect
          label="Status"
          placeholder="Pick value"
          allowDeselect={false}
          data={JobStatusList}
          onChange={(value) => setStatus(value ?? "")}
        />        

        <div className="text-right">
          <PButton my={10} >Create Job</PButton>
        </div>
        <PDivider my={10}/>
        <JobListIndex data={result.data || emptyPagedList}  />
      </section>
    </main>
  );
}