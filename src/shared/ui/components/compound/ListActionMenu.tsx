import { ActionIcon, Menu } from '@mantine/core'
import { IconEye } from '@tabler/icons-react'
import { IconPlus } from '@tabler/icons-react'
import { IconEdit, IconMail, IconTrash, IconDotsVertical } from '@tabler/icons-react'

export enum EListActionType {
  Add,
  Details,
  Edit,
  Delete,
  Email
}

export interface IProps {
  id: string
  showAdd?: boolean
  showDetails?: boolean
  showEdit? : boolean
  showDelete?: boolean
  showEmail?: boolean
  disableAdd?: boolean
  disableDetails?: boolean
  disableEdit?: boolean,
  disableDelete?: boolean,
  disableEmail?: boolean,
  onActionClick: (id: string, actionType: EListActionType) => void
}

export function ListActionMenu({ 
  id,
  showAdd=false,
  showEdit=false,
  showDelete=false,
  showDetails=false,
  showEmail=false,
  disableAdd=false,
  disableEdit=false,
  disableDelete=false,
  disableDetails=false,
  disableEmail=false,
  onActionClick,
}: IProps) {

  const clickHandle = (action: EListActionType) => {
    onActionClick(id, action)
  }

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon size="sm" variant="outline" aria-label="Actions">
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {showAdd &&
          <Menu.Item 
            disabled={disableAdd} 
            leftSection={<IconPlus size={14} />}
            onClick={() =>clickHandle(EListActionType.Add)}
          >
            Add
          </Menu.Item>
        }
        {showEdit &&
          <Menu.Item 
            disabled={disableEdit} 
            leftSection={<IconEdit size={14} />}
            onClick={() =>clickHandle(EListActionType.Edit)}
          >
            Edit
          </Menu.Item>
        }  
        {showDetails &&
          <Menu.Item 
            disabled={disableDetails} 
            leftSection={<IconEye size={14} />}
            onClick={() =>clickHandle(EListActionType.Details)}
          >
            View Details
          </Menu.Item>
        }                        
        {showDelete &&
          <Menu.Item 
            disabled={disableDelete} 
            color="red" 
            leftSection={<IconTrash size={14} />}
            onClick={() =>clickHandle(EListActionType.Delete)}
          >
            Delete
          </Menu.Item>        
        }
        {showEmail &&
          <Menu.Item 
            disabled={disableEmail} 
            leftSection={<IconMail size={14} />}
            onClick={() =>clickHandle(EListActionType.Email)}
          >
            Email
          </Menu.Item>                
        }
      </Menu.Dropdown>

    </Menu>
  )
}