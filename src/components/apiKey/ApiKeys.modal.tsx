import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { IconKey } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { Button, Table } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IApiKey, IPagedList } from '@/assets/interfaces/_index';
import {
  DisplayMask,
  EListItemMenuType,
  ListItemMenu,
  Paginator,
  PModalDialog,
} from '@/components/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { IDialogConfirmInput, useDialogConfirm } from '@/hooks/useDialogConfirm';
import { useAuthStore } from '@/stores/authStore';
import { useEntityStore } from '@/stores/entityStore';
import ApiKeyGenerate, { IHandles as ApiKeyFormHndl } from './ApiKeyAddEdit.modal';

export interface IProps {}

export interface IHandles {
  open: () => void;
}

const ApiKeys = forwardRef<IHandles, IProps>((_props, ref) => {
  const generateKeyForm = useRef<ApiKeyFormHndl>(null);
  const entityStore = useEntityStore();
  const authStore = useAuthStore();
  const confirm = useDialogConfirm();
  const db = useDatabase();
  const [opened, setOpened] = useState<boolean>(false);
  const clipboard = useClipboard();

  useImperativeHandle(ref, () => ({
    open() {
      setOpened(true);
      updateData(1);
    },
  }));

  const updateData = (pageNo: number) => {
    const url = `apikeys?page=${pageNo}&pageSize=${5}`;
    db.httpGet<IPagedList<IApiKey>>(url, true).then((response) => {
      if (response.success) {
        if (response.data) {
          entityStore.setApiKeyPagedList(response.data);
        }
      }
    });
  };

  const generateKeyClickHndl = () => {
    generateKeyForm.current?.add();
  };

  const generateKeyHndl = (apiKeyName: string) => {
    const data = {
      apiKeyName,
    };
    db.httpPost<IPagedList<IApiKey>, any>('apikeys/generateApikey', data, true).then((response) => {
      if (response.success) {
        if (response.data) {
          entityStore.setApiKeyPagedList(response.data);
        }
      }
    });
  };

  const renameKeyHndl = (id: string, apiKeyName: string) => {
    const data = {
      id,
      apiKeyName,
    };
    db.httpPut<IApiKey, any>('apikeys/renameApikey', data, true).then((response) => {
      if (response.success) {
        if (response.data) {
          const index = entityStore.apiKeyPagedList.list.findIndex((item) => item.id === id);
          const list: IApiKey[] = [
            ...entityStore.apiKeyPagedList.list.slice(0, index),
            response.data,
            ...entityStore.apiKeyPagedList.list.slice(
              index + 1,
              entityStore.apiKeyPagedList.list.length
            ),
          ];
          const newPagedList = {
            ...entityStore.apiKeyPagedList,
            list,
          };
          entityStore.setApiKeyPagedList(newPagedList);
        }
      }
    });
  };

  const menuItemClickHndl = (actionType: EListItemMenuType, id: string) => {
    if (actionType === EListItemMenuType.CopyClipboard) {
      copyKeyToClipboard(id);
    } else if (actionType === EListItemMenuType.Delete) {
      const options: IDialogConfirmInput = {
        width: 'xs',
        title: 'Confirm delete',
        message: 'Are you sure you want to delete this Api Key.',
      };
      confirm.open(() => {
        deleteApiKey(id);
      }, options);
    } else if (actionType === EListItemMenuType.Edit) {
      const index = entityStore.apiKeyPagedList.list.findIndex((item) => item.id === id);
      if (index >= 0) {
        const apiKeyName = entityStore.apiKeyPagedList.list[index].keyName;
        generateKeyForm.current?.edit(id, apiKeyName);
      }
    }
  };

  const copyKeyToClipboard = (id: string) => {
    db.httpGet<IApiKey>(`apikeys/${id}`, false).then((response) => {
      if (response.success) {
        if (response.data) {
          const key = response.data.key;
          copyToClipboard(key);
        }
      }
    });
  };

  const deleteApiKey = (id: string) => {
    db.httpDelete(`apikeys/${id}`, true).then((response) => {
      if (response.success) {
        const index = entityStore.apiKeyPagedList.list.findIndex((item) => item.id === id);
        const list: IApiKey[] = [
          ...entityStore.apiKeyPagedList.list.slice(0, index),
          ...entityStore.apiKeyPagedList.list.slice(
            index + 1,
            entityStore.apiKeyPagedList.list.length
          ),
        ];
        const newPagedList = {
          ...entityStore.apiKeyPagedList,
          list,
        };
        entityStore.setApiKeyPagedList(newPagedList);
      }
    });
  };

  const copyToClipboard = (value: string | null | undefined) => {
    clipboard.copy(value);
    notifications.show({
      color: 'green',
      title: 'Success',
      message: 'Secret key copied to clipboard.',
      autoClose: true,
    });
  };

  const copyCompanyKeyHndl = () => {
    clipboard.copy(authStore.authToken?.organization.id);
    notifications.show({
      color: 'green',
      title: 'Success',
      message: 'Company key copied to clipboard.',
      autoClose: true,
    });
  };

  const pageChangeHndl = (pageNo: number) => {
    updateData(pageNo);
  };

  return (
    <PModalDialog
      title="Api Keys"
      opened={opened}
      onClose={() => setOpened(false)}
      icon={<IconKey size={21} />}
      size="xl"
    >
      <ApiKeyGenerate
        ref={generateKeyForm}
        onGenerateSecretKey={generateKeyHndl}
        onEditSecretKey={renameKeyHndl}
      />
      <div className="h-[27rem]">
        <div className="h-[23.9rem]">
          <div className="font-bold">Customer Key</div>
          <div className="mb-3">
            <div className="text-xs mb-1">Click to copy to clipboard</div>
            <button
              type="button"
              className="py-1 px-2 border-gray-700 border border-dashed rounded-md bg-slate-100 hover:cursor-pointer select-none"
              onClick={copyCompanyKeyHndl}
            >
              {authStore.authToken?.organization.id}
            </button>
          </div>
          <div className="flex justify-between items-end mb-2">
            <div className="font-bold">Secret Keys</div>
            <Button size="xs" onClick={generateKeyClickHndl}>
              Create Secret Key
            </Button>
          </div>
          <Table withColumnBorders striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>Name</Table.Th>
                <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '100px' }}>
                  Created On
                </Table.Th>
                <Table.Th style={{ backgroundColor: 'black', color: 'white', width: '110px' }}>
                  Secret Key
                </Table.Th>
                <Table.Th
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    width: '70px',
                    textAlign: 'center',
                  }}
                >
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {entityStore.apiKeyPagedList?.list.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.keyName}</Table.Td>
                  <Table.Td>
                    {DateTime.fromISO(item.createdOn).toLocaleString(DateTime.DATE_MED)}
                  </Table.Td>
                  <Table.Td style={{ fontSize: '11px' }}>
                    <DisplayMask value={item.key} />
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'center' }}>
                    <ListItemMenu
                      id={item.id}
                      onActionClick={menuItemClickHndl}
                      showDelete
                      showCopyClipboard
                      showEdit
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
            {!entityStore.apiKeyPagedList?.list.length ? (
              <tfoot>
                <tr>
                  <td colSpan={3} className="text-center">
                    <div className="p-2 text-lg font-bold">
                      <span>No records</span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            ) : null}
          </Table>
        </div>
        <div className="flex justify-center">
          {entityStore.apiKeyPagedList.pageCount > 1 ? (
            <Paginator
              page={entityStore.apiKeyPagedList?.pageNumber}
              pageCount={entityStore.apiKeyPagedList?.pageCount}
              onPageChange={pageChangeHndl}
            />
          ) : null}
        </div>
      </div>
    </PModalDialog>
  );
});

export default ApiKeys;
