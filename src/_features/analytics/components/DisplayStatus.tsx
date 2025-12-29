import { useEffect, useMemo, useRef } from "react";
import { Loader, Table } from '@mantine/core';
import { statusBkgdColorMapper, TStatusTypeWithStopping } from "@/assets/utils/statusColorMapper";
import { TStatusType } from "@/assets/types/types";
import { IDataPipelineItem } from "@/assets/interfaces/_index";

export interface IProps {
  job: IDataPipelineItem;
  displayType: 'cell' | 'bullet';
}

export function DisplayStatus({ job, displayType }: IProps) {
  const prevStatus = useRef<TStatusType | null>(null);
  const ref = useRef<HTMLTableCellElement>(null);

  const isStopping = useMemo(() => {
    return true
  }, [])

  const adjustedStatus = useMemo<TStatusTypeWithStopping>(() => {
    if (job.status === 'Started' && isStopping) {
      return 'Stopping'
    }
    return job.status
  }, [isStopping, job.status])

  const { color, backgroundColor } = statusBkgdColorMapper(adjustedStatus);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Only pulse when status ACTUALLY changes (not on first load)
    if (prevStatus.current && prevStatus.current !== job.status) {
      el.classList.add("status-pulse");

      // Remove class after animation ends
      el.addEventListener(
        "animationend",
        () => el.classList.remove("status-pulse"),
        { once: true }
      );
    }

    prevStatus.current = job.status;
  }, [adjustedStatus]);

  return (
    <>
      {(displayType==="bullet") &&
        <div
          ref={ref}
          style={{
            backgroundColor,
            color,
            transition: "background-color 0.2s ease",
          }}
          className="py-0.5 px-2 border-black-1 rounded-xl font-semibold"
        >
          <div className="flex justify-between gap-2 items-center">
            {adjustedStatus}
            {(adjustedStatus==="Started" || adjustedStatus==="Stopping") && <Loader className="mr-1" color={color} size={10}/>}
          </div>
        </div>
      }
      {(displayType==="cell") &&
        <Table.Td
          ref={ref}
          style={{
            backgroundColor,
            color,
            transition: "background-color 0.2s ease",
          }}
        >
          <div className="flex justify-between gap-2 items-center font-semibold">
            {adjustedStatus}
            {(adjustedStatus==="Started" || adjustedStatus==="Stopping") && <Loader className="mr-1" color={color} size={12}/>}
          </div>
        </Table.Td>
      }
    </>
  );
}