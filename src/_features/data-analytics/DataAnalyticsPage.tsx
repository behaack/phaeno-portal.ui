export function DataAnalyticsPage() {
  return (
    <main>
      <section>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
        <div>Data Analytics Page</div>
      </section>
    </main>
  )
}

// import { useEffect, useMemo, useRef, useState } from "react";
// import { createFileRoute, useNavigate } from "@tanstack/react-router";
// import { IconMath } from "@tabler/icons-react";
// import { Select, Divider, Button } from "@mantine/core";
// import { useAnalyticsStore } from "@/stores/analyticsStore";
// import { useDatabase } from "@/hooks/useDatabase";
// import { IDataPipelineItem, IPagedList } from "@/assets/interfaces/_index";
// import { beforeLoadAuth } from "@/assets/route-guard";
// import { searchSchema, statuses } from "@/assets/route-validator/analytics";
// import { AnalyticsErrorBoundary } from "@/components/errorBoundries/Analytics";
// import JobDialog, { IHandles, TJobListType } from "@/components/analytics/AddJob/JobDialog";
// import JobListIndex from "@/components/analytics/JobList/Index";
// import { JOB_TYPES } from "@/assets/lookupLists/_index";
// import { TJobType } from "@/assets/types/types";

// type TStatusTypes = typeof statuses[number];

// export const Route = createFileRoute("/analytics/")({
//   component: PipelineDashboard,
//   validateSearch: (search) => searchSchema.parse(search),
//   beforeLoad: beforeLoadAuth,
//   errorComponent: AnalyticsErrorBoundary,  
// });

// export function PipelineDashboard() {
//   const db = useDatabase();
//   const analyticsStore = useAnalyticsStore();
//   const umapForm = useRef<IHandles>(null);
//   const navigate = useNavigate();
//   const { jobstatus, jobtype } = Route.useSearch();

//   useEffect(() => {
//     getData();
//   }, [])

//   const setJobStatus = (value: TStatusTypes) => {
//     navigate({
//       to: Route.to,
//       search: {
//         jobstatus: value,
//         jobtype: jobtype,
//       }
//     })
//   }

//   const setJobType = (value: TJobType) => {
//     navigate({
//       to: Route.to,
//       search: {
//         jobstatus: jobstatus,
//         jobtype: value,
//       }
//     })
//   }

//   const getData = () => {
//     db.httpGet<IPagedList<IDataPipelineItem>>('datapipelineRuns', true).then(results => {
//       if (results.success) {
//         if (results.data) {
//           analyticsStore.setdataPipelinePagedList(results.data)
//         }
//       }
//     })
//   }  

//   const addJobHndl = () => {
//     umapForm.current?.open(jobtype);
//   }

//   const jobstatusForComponents = useMemo(() => {
//     const index = statuses.findIndex(item => item === jobstatus);
//     return index <= 0 ? '' : jobstatus
//   }, [jobstatus])

//   return (
//     <main>
//       <section>
//         <h1 className="flex items-center gap-2">
//           <IconMath size={30}/>
//           Analytics Dashboard
//         </h1>        
//         <JobDialog ref={umapForm} />   
//         <Select
//           label="Job Type"
//           placeholder="Pick value"
//           data={JOB_TYPES}
//           allowDeselect={false}
//           value={jobtype}
//           onChange={(value) => setJobType(value as TJobListType)}
//         />
//         <Select
//           label="Status"
//           placeholder="Pick value"
//           data={statuses}
//           allowDeselect={false}
//           value={jobstatus}
//           onChange={(value) => setJobStatus(value as TStatusTypes)}          
//         />        
//         <div className="text-right">
//           <Button my={10} onClick={addJobHndl}>Create Job</Button>
//         </div>
//         <Divider my={10}/>
//         <JobListIndex jobType={jobtype} jobStatus={jobstatusForComponents} />
//       </section>
//     </main>
//   );
// }