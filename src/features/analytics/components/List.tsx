import { DisplayStatus } from "./DisplayStatus";
import { statusDate } from "../helpers/statusDate";
import { DataPipelineItem } from "@/api/types/job-pipeline";

export interface IProps {
  list: DataPipelineItem[];
}

export function JobList({ list }: IProps) {
  return (
    <ul className="list-group-container">
      {list.map((item) => (
        <li key={item.id} className="flex justify-between">
          <div className="flex flex-col gap-0.5">
            <div className="list-item primary">
              {item.pipelineName}
            </div>
            <div>
              <span className="font-semibold">Job Type: </span>
              {item.jobType}
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">Status: </span>
              <DisplayStatus job={item} displayType="bullet" />
            </div>
            <div>
              <span className="font-semibold">Status Date: </span>
              {statusDate(item)}
            </div>
          </div>
          <div className="mt-1 mr-1">
          </div>
        </li>
      ))}
    </ul>    
  );
}
