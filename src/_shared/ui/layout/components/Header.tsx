import { useMemo } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Tooltip } from '@mantine/core';
import { useAuthStore } from '@/stores/authStore';
import DropdownMenu from '../DropdownMenu';
import type IMainMenuItem from './IMenuListItem';
import mainMenuList from './menuList';

export default function Header() {
  const authStore = useAuthStore();
  const location = useLocation();

  const baseRoute = useMemo(() => {
    const currentRoute = location.pathname;
    return currentRoute.toLowerCase().split('/')[1];
  }, [location.pathname]);

  // const disableMenuItem = (item: IMainMenuItem) => {
  //   return (
  //     authStore.selectedOrganization === null &&
  //     authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno &&
  //     item.userDataRoute
  //   );
  // };

  // const hideTooltip = useMemo(() => {
  //   const isPhaenoOrg =
  //     authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno;
  //   return isPhaenoOrg ? authStore.selectedOrganization !== null : true;
  // }, [authStore.selectedOrganization, authStore.authToken?.organization.organizationType]);

  return (
    <header>
      <div className="flex justify-center">
        <div className="w-full select-none max-w-7xl px-5 flex justify-between items-center">
          <div>&nbsp;</div>
          <ul>
            <li>
              <Link
                to="/"
                className={`${baseRoute === '' ? 'active' : ''} no-underline text-black`}
              >
                <div>Home</div>
              </Link>
            </li>
            {mainMenuList.map((item) => (
              <li key={item.index}>
                {/* <Link
                  tabIndex={disableMenuItem(item) ? -1 : 0}
                  to={disableMenuItem(item) ? '#' : item.route}
                  className={`${item.route === baseRoute ? 'active' : ''} ${disableMenuItem(item) ? 'disable' : ''} no-underline text-black`}
                >
                  <Tooltip
                    label="Select a customer to see data. Use the dropdown menu to the right."
                    disabled={hideTooltip}
                  >
                    <div>{item.label}</div>
                  </Tooltip>
                </Link> */}
              </li>
            ))}
          </ul>
          <DropdownMenu baseRoute={baseRoute} />
        </div>
      </div>
    </header>
  );
}
