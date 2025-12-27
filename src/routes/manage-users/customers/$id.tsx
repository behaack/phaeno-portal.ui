import { useEffect, useRef, useState } from 'react';
import { IconBuilding, IconUsers } from '@tabler/icons-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import { Button, Divider } from '@mantine/core';
import { beforeLoadAuth } from '@/assets/route-guard';
import { IOrganization } from '@/assets/interfaces/_index';
import { searchSchema } from '@/assets/route-validator/user-management';
import { CustomerDetailsErrorBoundary } from '@/components/errorBoundries/CustomerDetails';
import { Route as ListRoute } from '@/routes/manage-users/index'
import { useDatabase } from '@/hooks/useDatabase';
import { useDeviceSize } from '@/hooks/useDeviceSize';
import { useEntityStore } from '@/stores/entityStore';
import DisplayAddress from '@/components/DisplayAddress';
import DetailPageHeader from '@/components/user-management/customers/DetailPageHeader';
import EditCustomer, { IHandles } from '@/components/user-management/customers/Edit.modal';
import UserList from '@/components/user-management/users/List';
import z from 'zod';

export const Route = createFileRoute('/manage-users/customers/$id')({
  component: CustomerDetails,
  validateSearch: (search) => searchSchema.parse(search),
  params: {
    parse: (raw) => ({ 
      id: z.string().uuid().parse(raw.id), 
    }),
    stringify: ({ id }) => ({ 
      id: String(id) 
    }),
  },
  beforeLoad: beforeLoadAuth,
  errorComponent: CustomerDetailsErrorBoundary,
});

function CustomerDetails() {
  const db = useDatabase();
  const navigate = useNavigate();
  const entityStore = useEntityStore();
  const formRef = useRef<IHandles>(null);
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [width] = useDeviceSize();
  const { id } = Route.useParams();
  const { type, pageno, searchstr } = Route.useSearch();

  useEffect(() => {
    setPage(pageno);
    setSearch(searchstr || '');
  }, [type, pageno, searchstr]);

  useEffect(() => {
    getData(id);
  }, [id]);

  const getData = (id: string) => {
    entityStore.setCustomer(null);
    db.httpGet<IOrganization>(`organizations/${id}`, true).then((response) => {
      if (response.success) {
        if (response.data) {
          entityStore.setCustomer(response.data);
        }
      } else if (response.error?.status === 404) {
        notifications.show({
          color: 'red',
          title: 'Error: 404 - Customer not found',
          message:
            'A Customer with the provided Id could not be found. Returning you to the Customer List',
          autoClose: true,
        });
        navigate({
          to: ListRoute.to,
          search: {
            type: 'customer',
            pageno: 1
          }
        })
      }
    });
  };

  const queryParamChangeHndl = (pageNo: number, searchStr: string) => {
    setPage(pageNo);
    setSearch(searchStr);
  };

  const editCustomerHndl = () => {
    if (entityStore.customer) {
      formRef.current?.edit(entityStore.customer);
    }
  };

  return (
    <main>
      <section>
        <EditCustomer ref={formRef} />
        <DetailPageHeader
          page={page}
          searchStr={search}
          icon={<IconUsers />}
          title="Users"
          onQueryParamChange={queryParamChangeHndl}
        />
        <div className="flex justify-between items-center my-2">
          <h3 className="inline-flex items-center gap-3"><IconBuilding />Customer Details</h3>
          <Button rightSection={<IconBuilding />} onClick={editCustomerHndl}>
            Edit
          </Button>
        </div>
        <ul className="property-group-container">
          <li>
            <div className="property-name">Customer Name</div>
            <div className="property-value">{entityStore.customer?.organizationName}</div>
          </li>
          <li>
            <div className="property-name">Customer Address</div>
            <div className="property-value">
              <DisplayAddress
                className="text-sm font-sans"
                street1={entityStore.customer?.street1}
                street2={entityStore.customer?.street2}
                city={entityStore.customer?.city}
                state={entityStore.customer?.state}
                postalCode={entityStore.customer?.postalCode}
                countryCode={entityStore.customer?.countryCode}
              />
            </div>
          </li>
        </ul>
        <Divider my="lg" variant="solid" />
        <div className={`${width > 775 ? 'mx-5' : ''}`}>
          {entityStore.customer ? (
            <UserList
              component
              title={` Users - ${entityStore.customer?.organizationName || ''}`}
              organizationId={entityStore.customer?.id}
            />
          ) : null}
        </div>
      </section>
    </main>
  );
}
