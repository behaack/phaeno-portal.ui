import { UserListItem } from "@/api/types/user"
import { useConfirmAction } from "@/shared/hooks/useConfirmAction"
import { DisplayBoolean, EListActionType, ListActionMenu } from "@/shared/ui/components/compound"
import { AddEditUserModal, IHandles } from '../AddEditUser.Modal';
import { Table } from "@mantine/core"
import { useNavigate } from "@tanstack/react-router"
import { useRef } from "react";
import { queryClient } from "@/app/providers/queryClient";
import { userByIdQueryOptions } from "@/api/hooks/userHooks";

export interface IProps {
  list: UserListItem[]
}

export function UserTable({ list }: IProps) {
  const editForm = useRef<IHandles>(null)
  const confirm = useConfirmAction()
  const navigate = useNavigate()

  const actionClickHndl = (id: string, action: EListActionType) => {
    switch (action) {
      case EListActionType.Edit:      
        editUserAsync(id)
        return
      case EListActionType.Delete:
        deleteUser(id)
        return
      default:
        return
    }
  }

  const editUserAsync = async (id: string) => {
    const user = await queryClient.fetchQuery(userByIdQueryOptions(id));  
    editForm.current?.edit(user)
  }

  const deleteUser = async (id: string) => {
    if (!(await confirm({
      title: "Delete record?",
      message: "Are you sure you want to delete this record?",
    }))) return;

    console.log("DELETED: ", id)
  };

  return (
    <div>
      <AddEditUserModal ref={editForm} />
      <Table withTableBorder withColumnBorders striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>
              First Name
            </Table.Th>
            <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>
              Last Name
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
              <Table.Td>{item.firstName}</Table.Td>
              <Table.Td>{item.lastName}</Table.Td>
              <Table.Td className="text-center"><DisplayBoolean value={item.isAdmin} /></Table.Td>
              <Table.Td className="text-center">
                <ListActionMenu id={item.id} showEdit showEmail={!item.isSetup} showDelete onActionClick={actionClickHndl} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  )
}