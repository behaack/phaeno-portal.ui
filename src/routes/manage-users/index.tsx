import { useMemo } from 'react';
import { IconBuilding, IconUsers } from '@tabler/icons-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Tabs } from '@mantine/core';
import { searchSchema } from '@/assets/route-validator/user-management';
import { ManageUserIndexErrorBoundary } from '@/components/errorBoundries/ManageUserIndex';
import { beforeLoadAuth } from '@/assets/route-guard';
import { useAuthStore } from '@/stores/authStore';
import { EOrganizationType } from '@/assets/enums/_index';
import Users from '@/components/user-management/users/List';
import Customers from '@/components/user-management/customers/List';

export const Route = createFileRoute('/manage-users/')({
  beforeLoad: beforeLoadAuth,
  component: AccountMgmtIndex,
  validateSearch: (search) => searchSchema.parse(search),
  errorComponent: ManageUserIndexErrorBoundary,
});

function AccountMgmtIndex() {
  const navigate = useNavigate();
  const authStore = useAuthStore()
  const { type } = Route.useSearch();

  const tabChangeHndl = (value: string | null) => {
    if (value === 'user') {
      navigate({
        to: Route.to,
        search: {
          type: 'user',
          pageno: 1,
          searchstr: '',
        },
      });
      return;
    }

    if (value === 'customer') {
      navigate({
        to: Route.to,
        search: {
          type: 'customer',
          pageno: 1,
          searchstr: '',
        },
      });
    }
  };

  const isAdmin = useMemo(() => {
    return authStore.authToken?.user.isAdmin || false;
  }, [authStore.authToken]);

  const isPhaenoAdmin = useMemo(() => {
    return (
      isAdmin && authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno
    );
  }, [authStore.authToken]);

  const isPhaenoUser = useMemo(() => {
    return !isAdmin && authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno
  }, [authStore.authToken])

  return (
    <main>
      <title>User Managment - PSeq Portal</title>
      <section>
        <h1 className="flex items-center gap-2">
          <IconUsers />
          Users
        </h1>
        {(isPhaenoAdmin)
        ? <Tabs onChange={tabChangeHndl} value={type} defaultValue="employees">
            <Tabs.List>
              <Tabs.Tab value="user" leftSection={<IconUsers size="1rem" />}>
                Employees
              </Tabs.Tab>
              <Tabs.Tab value="customer" leftSection={<IconBuilding size="1rem" />}>
                Customers
              </Tabs.Tab>
            </Tabs.List>
            <div className="mt-2">{type === 'user' ? <Users /> : <Customers />}</div>
          </Tabs>
        : <div className="mt-2">{isPhaenoUser ? <Customers /> : <Users /> }</div>
      }
      </section>
    </main>
  );
}
