import { IDataPipelineItem } from "../interfaces/_index";
import { DateTime } from "luxon";

export const statusDate = (item: IDataPipelineItem): string => {
  let statusDate = "";
  switch (item.status) {
    case "Queued":
      statusDate = item.submittedAt
      break;
    case "Started":
      statusDate = item.startedAt
      break;
    case "Canceled":
    case "Failed":
    case "Completed":
      statusDate = item.completedAt
      break;
  }
  return DateTime
    .fromISO(statusDate, { zone: "utc" })
    .setZone("local")  
    .toLocaleString(DateTime.DATETIME_MED)
}