import { useRef } from "react";
import { IPagedList } from "@/assets/interfaces/_index";
import { useDeviceSize } from "@/_shared/hooks/useDeviceSize";
import { DataPipelineItem } from "@/_api/types/job-pipeline";
import { JobList } from "./List";
import { JobTable } from "./Table";

export interface IProps {
  data: IPagedList<DataPipelineItem>
}

export function JobListIndex({ data }: IProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [width] = useDeviceSize()

  return (
    <div style={{ overflow: "auto" }}>
      {width >= 750 
        ? <JobTable list={data.list} /> 
        : <JobList list={[]} /> 
      }

      {/* Loader trigger zone */}
      <div
        ref={loaderRef}
        style={{ height: "40px", backgroundColor: "transparent" }}
      />
    </div>
  );
}
