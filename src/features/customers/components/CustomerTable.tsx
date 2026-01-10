import { useNavigate } from '@tanstack/react-router'
import { Table } from '@mantine/core'
import { Organization } from '@/api/types/organization'
import { useConfirmAction } from '@/shared/hooks/useConfirmAction'
import { EListActionType, ListActionMenu } from '@/shared/ui/components/compound'

export interface IProps {
  list: Organization[]
}

export function CustomerTable({ list }: IProps) {
  const confirm = useConfirmAction()
  const navigate = useNavigate()

  const actionClickHndl = (id: string, action: EListActionType) => {
    switch (action) {
      case EListActionType.Details:
        navigate({
          to: `${id}`,
        })
        return
      case EListActionType.Delete:
        deleteCustomer(id)
        return
      default:
        return
    }
  }

  const deleteCustomer = async (id: string) => {
    if (
      !(await confirm({
        title: 'Delete record?',
        message: 'Are you sure you want to delete this record?',
      }))
    )
      return

    console.log('DELETED: ', id)
  }

  return (
    <Table withTableBorder withColumnBorders striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>Customer Name</Table.Th>
          <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '300px' }}>
            City
          </Table.Th>
          <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '25px' }}>
            Country
          </Table.Th>
          <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '25px' }}>
            Action
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {list.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>{item.organizationName}</Table.Td>
            <Table.Td>{item.city}</Table.Td>
            <Table.Td>{item.countryCode}</Table.Td>
            <Table.Td className="text-center">
              <ListActionMenu id={item.id} showDetails showDelete onActionClick={actionClickHndl} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
