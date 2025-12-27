import { useEffect, useRef, useCallback, useMemo } from "react";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import { useDatabase } from "@/hooks/useDatabase";
import { IDataPipelineItem, IPagedList } from "@/assets/interfaces/_index";
import { TJobListType } from "../AddJob/JobDialog";
import { useDeviceSize } from "@/hooks/useDeviceSize";
import JobList from "./List";
import JobTable from "./Table";

export interface IJobList {
  jobType: TJobListType;
  jobStatus: string;
}

export default function JobListIndex({ jobType, jobStatus }: IJobList) {
  const db = useDatabase();
  const analyticsStore = useAnalyticsStore();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [width] = useDeviceSize();
  
  const pageNo = analyticsStore.dataPipelinePagedList.pageNumber;
  const totalPages = analyticsStore.dataPipelinePagedList.pageCount;

  const dataList = useMemo(() => {
    const dataList = analyticsStore.dataPipelinePagedList.list;
    if (jobStatus === "") return dataList;
    return dataList.filter(item => {
      return item.status === jobStatus
    })
  }, [jobStatus, analyticsStore.dataPipelinePagedList])

  // Fetch a page
  const fetchPage = useCallback(
    async (page: number) => {
      const url = `datapipelineRuns?jobtype=${jobType}&jobStatus=${jobStatus}&page=${page}`;
      const response = await db.httpGet<IPagedList<IDataPipelineItem>>(url, true);
      if (response.success && response.data) {
        const data = response.data;

        if (page === 1) {
          // first page, replace
          analyticsStore.setdataPipelinePagedList(data);
        } else {
          // append for infinite scroll
          analyticsStore.appendData(data.list);
          analyticsStore.setPageNumber(data.pageNumber);
        }
      }
    },
    [jobType, jobStatus, db, analyticsStore]
  );

  // Reload when jobType or jobStatus changes
  useEffect(() => {
    analyticsStore.setPageNumber(1);
    fetchPage(1);
  }, [jobType, jobStatus]);

  // Infinite scroll: when intersection observer fires, load next page
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        if (pageNo < totalPages) {
          fetchPage(pageNo + 1);
        }
      }
    });

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [pageNo, totalPages, fetchPage]);

  return (
    <div style={{ overflow: "auto" }}>
      {width >= 750 
        ? <JobTable list={dataList} /> 
        : <JobList list={dataList} /> 
      }

      {/* Loader trigger zone */}
      <div
        ref={loaderRef}
        style={{ height: "40px", backgroundColor: "transparent" }}
      />
    </div>
  );
}
