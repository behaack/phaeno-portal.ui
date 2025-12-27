import { useEffect, useRef, useState } from 'react';
import { IconUser, IconUsers } from '@tabler/icons-react';
import { Table } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { emptyPagedList, IPagedList, IUser } from '@/assets/interfaces/_index';
import { DisplayBoolean, EListItemMenuType, ListItemMenu } from '@/components/_index';
import ListPageHeader from '@/components/user-management/ListPageHeader';
import AddUser, { IHandles as IAddHandles } from '@/components/user-management/users/Add.modal';
import EditUser, { IHandles as IEditHandles } from '@/components/user-management/users/Edit.modal';
import { useDatabase } from '@/hooks/useDatabase';
import { useDeviceSize } from '@/hooks/useDeviceSize';
import { IDialogConfirmInput, useDialogConfirm } from '@/hooks/useDialogConfirm';
import { useAuthStore } from '@/stores/authStore';
import { useEntityStore } from '@/stores/entityStore';

export interface IProps {
  component?: boolean;
  title?: string;
  organizationId?: string;
}

export default function UserIndex({ component = false, title = '', organizationId = '' }: IProps) {
  const db = useDatabase();
  const entityStore = useEntityStore();
  const authStore = useAuthStore();
  const confirm = useDialogConfirm();
  const addFormRef = useRef<IAddHandles>(null);
  const editFormRef = useRef<IEditHandles>(null);
  const [width] = useDeviceSize();
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    entityStore.setUserPagedList(emptyPagedList);
  }, []);

  useEffect(() => {
    getData(page, search);
  }, [page, search, component, organizationId]);

  const queryParamChangeHndl = (pageNo: number, searchStr: string) => {
    setPage(pageNo);
    setSearch(searchStr);
  };

  const getData = async (page: number, searchValue: string) => {
    let url = `users?page=${page}&search=${searchValue}`;
    if (component) {
      url = `users/fororganization/${organizationId}?page=${page}&search=${searchValue}`;
    }
    db.httpGet<IPagedList<IUser>>(url, true).then((response) => {
      if (response.success) {
        if (response.data) {
          entityStore.setUserPagedList(response.data);
        }
      }
    });
  };

  const searchChangeHndl = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const editUser = (userId: string) => {
    db.httpGet<IUser>(`users/${userId}`, true).then((response) => {
      if (response.success) {
        if (response.data) {
          editFormRef.current?.edit(response.data);
        }
      }
    });
  };

  const onListItemAction = (actionType: EListItemMenuType, user: IUser) => {
    if (actionType === EListItemMenuType.Edit) {
      editUser(user.id);
      return;
    }
    if (actionType === EListItemMenuType.Delete) {
      const options: IDialogConfirmInput = {
        width: 'xs',
        title: 'Confirm delete',
        message: 'Are you sure you want to delete this user.',
      };
      confirm.open(() => {
        deleteUser(user.id);
      }, options);
    }
    if (actionType === EListItemMenuType.Email) {
      const data = {
        userId: user.id,
      };
      db.httpPost<null, any>('auth/SendAccountInvite', data, true).then((response) => {
        if (response.success) {
          notifications.show({
            color: 'green',
            title: 'Success',
            message: 'Email sent to user.',
          });
        }
      });
    }
  };

  const addItemHndl = () => {
    let orgId = authStore.authToken?.organization.id || '';
    if (component) {
      if (organizationId) {
        orgId = organizationId;
      }
    }
    addFormRef.current?.add(orgId);
  };

  const deleteUser = (id: string) => {
    db.httpDelete(`users/${id}`, true).then((response) => {
      if (response.success) {
        const index = entityStore.userPagedList.list.findIndex((item) => item.id === id);
        const list: IUser[] = [
          ...entityStore.userPagedList.list.slice(0, index),
          ...entityStore.userPagedList.list.slice(index + 1, entityStore.userPagedList.list.length),
        ];
        const newPagedList = {
          ...entityStore.userPagedList,
          list,
        };
        entityStore.setUserPagedList(newPagedList);
      }
    });
  };

  return (
    <div>
      <AddUser ref={addFormRef} />
      <EditUser ref={editFormRef} />
      <ListPageHeader
        title={`${component ? title : `Employees`}`}
        headerIcon={<IconUsers size={22} />}
        actionIcon={<IconUser size={16} />}
        page={entityStore.userPagedList.pageNumber}
        pageCount={entityStore.userPagedList.pageCount}
        listLength={entityStore.userPagedList.list.length}
        searchValue={search}
        component={component}
        onPageChange={setPage}
        onSearchChange={searchChangeHndl}
        onAddItem={addItemHndl}
        onQueryParamChange={queryParamChangeHndl}
      />
      <Table withColumnBorders striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>Name</Table.Th>
            {width > 775 ? (
              <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>Email</Table.Th>
            ) : null}
            <Table.Th
              style={{
                backgroundColor: 'black',
                color: 'white',
                width: '80px',
                textAlign: 'center',
              }}
            >
              Set-up?
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
          {entityStore.userPagedList.list.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                {item.lastName}, {item.firstName}
              </Table.Td>
              {width > 775 ? <Table.Td>{item.email}</Table.Td> : null}
              <Table.Td style={{ textAlign: 'center' }}>
                <DisplayBoolean value={item.isSetup} />
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <ListItemMenu
                  id={item.id}
                  showEdit
                  showDelete
                  disableDelete={item.id === authStore.authToken?.userId}
                  showEmail={!item.isSetup}
                  onActionClick={(actionType: EListItemMenuType) =>
                    onListItemAction(actionType, item)
                  }
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
        {!entityStore.userPagedList.list.length ? (
          <tfoot>
            <tr>
              <td colSpan={6} className="text-center">
                <div className="p-2 text-lg font-bold">
                  <span>No records</span>
                </div>
              </td>
            </tr>
          </tfoot>
        ) : null}
      </Table>
    </div>
  );
}
