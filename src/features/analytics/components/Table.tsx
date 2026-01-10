import { useRef } from 'react'
import { Table } from '@mantine/core'
import { useCancelJobMutation } from '@/api/hooks/job-pipeline.hooks'
import { DataPipelineItem, JobStatusType } from '@/api/types/job-pipeline'
import { EListActionType, ListActionMenu } from '@/shared/ui/components/compound'
import { statusDate } from '../helpers/statusDate'
import { DisplayStatus } from './DisplayStatus'
import { IHandles, JobDetailsModal } from './JobDetails.Modal'

export interface IProps {
  list: DataPipelineItem[]
}
export function JobTable({ list }: IProps) {
  const detailsModal = useRef<IHandles>(null)
  const cancelMutation = useCancelJobMutation()

  const actionHdl = async (id: string, actionType: EListActionType) => {
    switch (actionType) {
      case EListActionType.Cancel:
        await cancelMutation.mutateAsync(id)
        return
      case EListActionType.Details:
        const index = list.findIndex((item) => item.id === id)
        if (index < 0) return
        const job = list[index]
        detailsModal.current?.open(job)
        return
    }
  }

  return (
    <div>
      <JobDetailsModal ref={detailsModal} />
      <Table withTableBorder withColumnBorders stickyHeader striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>Job Name</Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: 110 }}>
              Job Type
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: 110 }}>
              Status
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white', width: 200 }}>
              Status Date
            </Table.Th>
            <Table.Th
              style={{
                backgroundColor: 'black',
                color: 'white',
                width: '100px',
                textAlign: 'center',
              }}
            >
              Actions
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {list.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>{item.pipelineName}</Table.Td>
              <Table.Td>{item.jobType}</Table.Td>
              <DisplayStatus job={item} displayType="cell" />
              <Table.Td>{statusDate(item)}</Table.Td>
              <Table.Td className="text-center">
                <ListActionMenu
                  id={item.id}
                  disableDetails={item.status === JobStatusType.Started}
                  showCancel={item.status === JobStatusType.Started}
                  showDetails
                  onActionClick={actionHdl}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}
