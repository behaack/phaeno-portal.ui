import { UserListItem } from "@/api/types/user"
import { useConfirmAction } from "@/shared/hooks/useConfirmAction"
import { DisplayBoolean, EListActionType, ListActionMenu } from "@/shared/ui/components/compound"
import { Table } from "@mantine/core"

export interface IProps {
  list: UserListItem[]
}
export function UserList({ list }: IProps) {
  const confirm = useConfirmAction()

  const actionClickHndl = (id: string, action: EListActionType) => {
    switch (action) {
      case EListActionType.Details:
        return
      case EListActionType.Delete:
        deleteUser(id)
        return
      default:
        return
    }
  }

  const deleteUser = async (id: string) => {
    if (!(await confirm({
      title: "Delete record?",
      message: "Are you sure you want to delete this record?",
    }))) return;

    console.log("DELETED: ", id)
  };
    
  return (
    <Table withTableBorder withColumnBorders striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>
            User Name
          </Table.Th>
          <Table.Th style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', width: '100px' }}>
            Is Admin
          </Table.Th>
          <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '25px' }}>
            Action
          </Table.Th>          
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {list.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td>{item.firstName} {item.firstName}</Table.Td>
            <Table.Td><DisplayBoolean value={item.isAdmin} /></Table.Td>
            <Table.Td className="text-center">
              <ListActionMenu id={item.id} showDetails showDelete onActionClick={actionClickHndl} />
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}