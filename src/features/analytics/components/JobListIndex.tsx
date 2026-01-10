import { useRef } from 'react'
import { DataPipelineItem } from '@/api/types/job-pipeline'
import { useDeviceSize } from '@/shared/hooks/useDeviceSize'
import { IPagedList } from '@/shared/types/IPagedList'
import { JobList } from './List'
import { JobTable } from './Table'

export interface IProps {
  data: IPagedList<DataPipelineItem>
}

export function JobListIndex({ data }: IProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const [width] = useDeviceSize()

  return (
    <div style={{ overflow: 'auto' }}>
      {width >= 750 ? <JobTable list={data.list} /> : <JobList list={[]} />}

      {/* Loader trigger zone */}
      <div ref={loaderRef} style={{ height: '40px', backgroundColor: 'transparent' }} />
    </div>
  )
}
