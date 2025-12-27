import { useEffect, useRef, useState } from 'react';
import { IconBuilding } from '@tabler/icons-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Table } from '@mantine/core';
import { emptyPagedList, IOrganization, IPagedList } from '@/assets/interfaces/_index';
import { EListItemMenuType, ListItemMenu } from '@/components/_index';
import ListPageHeader from '@/components/user-management/ListPageHeader';
import { useDatabase } from '@/hooks/useDatabase';
import { useDialogConfirm } from '@/hooks/useDialogConfirm';
import { Route as DetailsRoute } from '@/routes/manage-users/customers/$id';
import { Route } from '@/routes/manage-users/index';
import { IDialogConfirmInput } from '@/stores/dialogConfirmStore';
import { useEntityStore } from '@/stores/entityStore';
import AddCustomer, { IHandles } from './Add.modal';

export default function CustomerIndex() {
  const db = useDatabase();
  const entityStore = useEntityStore();
  const navigate = useNavigate();
  const confirm = useDialogConfirm();
  const formRef = useRef<IHandles>(null);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const { pageno, searchstr } = Route.useSearch();

  useEffect(() => {
    entityStore.setUserPagedList(emptyPagedList);
    setPage(pageno);
    setSearch(searchstr || '');
  }, [pageno, searchstr]);

  useEffect(() => {
    navigate({
      to: Route.to,
      search: {
        type: 'customer',
        pageno: page,
        searchstr: search,
      },
    });
    getData(page, search);
  }, [page, search]);

  const queryParamChangeHndl = (pageNo: number, searchStr: string) => {
    setPage(pageNo);
    setSearch(searchStr);
  };

  const getData = async (pageNo: number, searchValue: string) => {
    const url = `organizations/customers?page=${pageNo}&search=${searchValue}`;
    db.httpGet<IPagedList<IOrganization>>(url, true).then((response) => {
      if (response.success) {
        if (response.data) {
          entityStore.setCustomerPagedList(response.data);
        }
      }
    });
  };

  const searchChangeHndl = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const onListItemAction = (actionType: EListItemMenuType, id: string) => {
    if (actionType === EListItemMenuType.Details) {
      navigate({
        to: DetailsRoute.to,
        params: {
          id,
        },
        search: {
          type: 'customer',
          pageno: page,
          searchstr: search,
        },
      });
    }

    if (actionType === EListItemMenuType.Delete) {
      deleteUser(id);
    }
  };

  const deleteUser = (id: string) => {
    const options: IDialogConfirmInput = {
      width: 'xs',
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this user.',
    };
    confirm.open(() => {
      deleteCustomer(id);
    }, options);
  };

  const deleteCustomer = (id: string) => {
    db.httpDelete(`organizations/${id}`, true).then((response) => {
      if (response.success) {
        const index = entityStore.customerPagedList.list.findIndex((item) => item.id === id);
        const list: IOrganization[] = [
          ...entityStore.customerPagedList.list.slice(0, index),
          ...entityStore.customerPagedList.list.slice(
            index + 1,
            entityStore.customerPagedList.list.length
          ),
        ];
        const newPagedList = {
          ...entityStore.customerPagedList,
          list,
        };
        entityStore.setCustomerPagedList(newPagedList);
      }
    });
  };

  const addItemHndl = () => {
    formRef.current?.add();
  };

  return (
    <div>
      <AddCustomer ref={formRef} />
      <ListPageHeader
        title="Customers"
        headerIcon={<IconBuilding size={24} />}
        actionIcon={<IconBuilding size={16} />}
        page={entityStore.customerPagedList.pageNumber}
        pageCount={entityStore.customerPagedList.pageCount}
        listLength={entityStore.customerPagedList.list.length}
        searchValue={search}
        onPageChange={setPage}
        onSearchChange={searchChangeHndl}
        onAddItem={addItemHndl}
        onQueryParamChange={queryParamChangeHndl}
      />
      <Table withColumnBorders striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ backgroundColor: 'black', color: 'white' }}>
              Organization Name
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
          {entityStore.customerPagedList.list.map((item) => (
            <Table.Tr key={item.id}>
              <Table.Td>
                <Link
                  to={DetailsRoute.to}
                  params={{
                    id: item.id,
                  }}
                  search={{
                    type: 'customer',
                    pageno: page,
                    searchstr: search,
                  }}
                >
                  {item.organizationName}
                </Link>
              </Table.Td>
              <Table.Td style={{ textAlign: 'center' }}>
                <ListItemMenu
                  id={item.id}
                  showDetails
                  showDelete
                  onActionClick={onListItemAction}
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
        {!entityStore.customerPagedList.list.length ? (
          <Table.Tfoot>
            <tr>
              <td colSpan={6} className="text-center">
                <div className="p-2 text-lg font-bold">
                  <span>No records</span>
                </div>
              </td>
            </tr>
          </Table.Tfoot>
        ) : null}
      </Table>
    </div>
  );
}
