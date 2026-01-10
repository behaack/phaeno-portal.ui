import { useEffect, useMemo, useRef } from 'react'
import { Loader, Table } from '@mantine/core'
import {
  DataPipelineItem,
  JobStatusType,
  JobStatusTypeWithStopping,
} from '@/api/types/job-pipeline'
import { useAnalyticsStore } from '@/stores/analytics.store'
import { statusBkgdColorMapper } from '../helpers/statusColorMapper'

export interface IProps {
  job: DataPipelineItem
  displayType: 'cell' | 'bullet'
}

export function DisplayStatus({ job, displayType }: IProps) {
  const analyticsStore = useAnalyticsStore()
  const prevStatus = useRef<JobStatusType | null>(null)
  const ref = useRef<HTMLTableCellElement>(null)

  const isStopping = useMemo(() => {
    const index = analyticsStore.canceledJobs.findIndex((item) => item === job.id)
    return index >= 0
  }, [job.status, analyticsStore.canceledJobs])

  const adjustedStatus = useMemo<JobStatusTypeWithStopping>(() => {
    if (job.status === 'Started' && isStopping) {
      return 'Stopping'
    }
    return job.status
  }, [isStopping, job.status])

  const { color, backgroundColor } = statusBkgdColorMapper(adjustedStatus)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Only pulse when status ACTUALLY changes (not on first load)
    if (prevStatus.current && prevStatus.current !== job.status) {
      el.classList.add('status-pulse')

      // Remove class after animation ends
      el.addEventListener('animationend', () => el.classList.remove('status-pulse'), { once: true })
    }

    prevStatus.current = job.status
  }, [adjustedStatus])

  return (
    <>
      {displayType === 'bullet' && (
        <div
          ref={ref}
          style={{
            backgroundColor,
            color,
            transition: 'background-color 0.2s ease',
          }}
          className="py-0.5 px-2 border-black-1 rounded-xl font-semibold"
        >
          <div className="flex justify-between gap-2 items-center">
            {adjustedStatus}
            {(adjustedStatus === 'Started' || adjustedStatus === 'Stopping') && (
              <Loader className="mr-1" color={color} size={10} />
            )}
          </div>
        </div>
      )}
      {displayType === 'cell' && (
        <Table.Td
          ref={ref}
          style={{
            backgroundColor,
            color,
            transition: 'background-color 0.2s ease',
          }}
        >
          <div className="flex justify-between gap-2 items-center font-semibold">
            {adjustedStatus}
            {(adjustedStatus === 'Started' || adjustedStatus === 'Stopping') && (
              <Loader className="mr-1" color={color} size={12} />
            )}
          </div>
        </Table.Td>
      )}
    </>
  )
}
