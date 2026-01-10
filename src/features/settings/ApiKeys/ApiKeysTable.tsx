import { Table } from "@mantine/core";
import { EListActionType, ListActionMenu, PSearchInput } from "@/shared/ui/components/compound";
import { useConfirmAction } from "@/shared/hooks/useConfirmAction";
import { ApiKeyListItem } from "@/api/types/api-keys";

export interface Props {
  list: ApiKeyListItem[]
}

export function ApiKeysTable({ list }: Props) {
  const confirm = useConfirmAction()
    
  const actionHndl = (id: string, actionType: EListActionType) => {
    if(actionType === EListActionType.Delete) {
      deleteApiKey(id)
      return
    }
  }

  const deleteApiKey = async (id: string) => {
    if (!(await confirm({
      title: "Delete record?",
      message: "Are you sure you want to delete this record?",
    }))) return;

    console.log("DELETED: ", id)
  };  

  return (
    <Table  withTableBorder withColumnBorders stickyHeader striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>
            Name
          </Table.Th>
          <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '125px' }}>
            Created On
          </Table.Th>
          <Table.Th
            style={{
              backgroundColor: 'black',
              color: 'white',
              width: '75px',
              textAlign: 'center',
            }}
          >
            Actions
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {(list.map(() => (
          <Table.Tr>
            <Table.Td>sdfg</Table.Td>
            <Table.Td>sdfg</Table.Td>
            <Table.Td className="text-center">                
              <ListActionMenu 
                id={"item.id.toString()"} 
                showDelete
                onActionClick={actionHndl}
              />
            </Table.Td>
          </Table.Tr>
        )))}
      </Table.Tbody>
    </Table>    
  )
}