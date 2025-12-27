import {
  IconArchive,
  IconCopy,
  IconDotsVertical,
  IconDownload,
  IconEye,
  IconList,
  IconMail,
  IconMask,
  IconPencil,
  IconPrinter,
  IconToggleLeft,
  IconToggleRight,
  IconTrash,
} from '@tabler/icons-react';
import { ActionIcon, Menu } from '@mantine/core';

export enum EListItemMenuType {
  Edit,
  Delete,
  Email,
  Details,
  Download,
  Archive,
  Unarchive,
  Inactivate,
  Print,
  Activate,
  Mask,
  Unmask,
  CopyClipboard,
  ToggleIsAdmin,
}

export interface IProps {
  onActionClick: (actionType: EListItemMenuType, id: string) => void;
  id: string;
  disabled?: boolean;
  showEdit?: boolean;
  showEmail?: boolean;
  showDelete?: boolean;
  showDetails?: boolean;
  showDownload?: boolean;
  showMask?: boolean;
  showUnmask?: boolean;
  showCopyClipboard?: boolean;
  showPrint?: boolean;
  showArchive?: boolean;
  showUnarchive?: boolean;
  showActivate?: boolean;
  showInactivate?: boolean;
  disableDelete?: boolean;
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function ListItemMenu({
  id,
  disabled = false,
  onActionClick,
  showEdit = false,
  showDelete = false,
  showDetails = false,
  showMask = false,
  showUnmask = false,
  showCopyClipboard = false,
  showEmail = false,
  showDownload = false,
  showPrint = false,
  showArchive = false,
  showUnarchive = false,
  showActivate = false,
  showInactivate = false,
  disableDelete = false,
  buttonSize = 'sm',
}: IProps) {
  return (
    <Menu position="bottom-end" shadow="md" width={220}>
      <Menu.Target>
        <ActionIcon variant="outline" size={buttonSize} radius="xl" disabled={disabled}>
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {showCopyClipboard ? (
          <Menu.Item
            leftSection={<IconCopy size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.CopyClipboard, id)}
          >
            Copy to clipboard
          </Menu.Item>
        ) : null}
        {showMask ? (
          <Menu.Item
            leftSection={<IconMask size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Mask, id)}
          >
            Mask Secret Key
          </Menu.Item>
        ) : null}
        {showUnmask ? (
          <Menu.Item
            leftSection={<IconEye size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Unmask, id)}
          >
            Unmask Secret Key
          </Menu.Item>
        ) : null}
        {showDetails ? (
          <Menu.Item
            leftSection={<IconEye size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Details, id)}
          >
            Details
          </Menu.Item>
        ) : null}
        {showEdit ? (
          <Menu.Item
            leftSection={<IconPencil size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Edit, id)}
          >
            Edit
          </Menu.Item>
        ) : null}
        {showEmail ? (
          <Menu.Item
            leftSection={<IconMail size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Email, id)}
          >
            Email Invite
          </Menu.Item>
        ) : null}
        {showDownload ? (
          <Menu.Item
            leftSection={<IconDownload size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Download, id)}
          >
            Download
          </Menu.Item>
        ) : null}
        {showPrint ? (
          <Menu.Item
            leftSection={<IconPrinter size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Print, id)}
          >
            Print
          </Menu.Item>
        ) : null}
        {showArchive ? (
          <Menu.Item
            color="red"
            leftSection={<IconArchive size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Archive, id)}
          >
            Archive
          </Menu.Item>
        ) : null}
        {showUnarchive ? (
          <Menu.Item
            leftSection={<IconList size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Unarchive, id)}
          >
            Unarchive
          </Menu.Item>
        ) : null}
        {showActivate ? (
          <Menu.Item
            leftSection={<IconToggleRight size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Activate, id)}
          >
            Activate
          </Menu.Item>
        ) : null}
        {showInactivate ? (
          <Menu.Item
            leftSection={<IconToggleLeft size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Inactivate, id)}
            color="red"
          >
            Inactivate
          </Menu.Item>
        ) : null}
        {showDelete ? (
          <Menu.Item
            leftSection={<IconTrash size="1rem" />}
            onClick={() => onActionClick(EListItemMenuType.Delete, id)}
            disabled={disableDelete}
            color="red"
          >
            Delete
          </Menu.Item>
        ) : null}
      </Menu.Dropdown>
    </Menu>
  );
}
