import { useRef } from "react";
import { useDeviceSize } from "@/shared/hooks/useDeviceSize";
import { DataPipelineItem } from "@/api/types/job-pipeline";
import { JobList } from "./List";
import { JobTable } from "./Table";
import { IPagedList } from "@/shared/types/IPagedList";

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
