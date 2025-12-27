import { IDataPipelineItem } from "@/assets/interfaces/_index";
import { statusDate } from "@/assets/utils/statusDate";
import { DisplayStatus } from "./DisplayStatus";
import { ActionButtons } from "./ActionButtons";

export interface IProps {
  list: IDataPipelineItem[];
}

export default function JobList({ list }: IProps) {
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
            <ActionButtons job={item} />
          </div>
        </li>
      ))}
    </ul>    
  );
}
