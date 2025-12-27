import { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Burger, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { EOrganizationType } from '@/assets/enums/_index';
import { useDatabase } from '@/hooks/useDatabase';
import { useDeviceSize } from '@/hooks/useDeviceSize';
import { useAuthStore } from '@/_stores/auth.store';
import { Subtype } from './components/IMenuListItem';
import MenuItem from './components/MenuItem';
import userMenuList from './components/menuList';
import CurrentUser from './CurrentUser';
import SelectedOrganization from './components/SelectedOrganization';
import ApiKeys, { IHandles as IApiKeysHndls } from '@/components/apiKey/ApiKeys.modal';
import SecuritySettings, { IHandles } from '@/components/security-settings/SecuritySettings.modal';

export interface IProps {
  baseRoute: string;
}

export default function DropdownMenu({ baseRoute }: IProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [width] = useDeviceSize();
  const authStore = useAuthStore();
  const db = useDatabase();
  const navigate = useNavigate();
  const location = useLocation();
  const securitySettingFrm = useRef<IHandles>(null);
  const apiKeysFrm = useRef<IApiKeysHndls>(null);
  const [opened, { close, toggle }] = useDisclosure(false);

  // const buttonHndl = (buttonType: Subtype) => {
  //   toggle();
  //   switch (buttonType) {
  //     case 'api keys':
  //       apiKeysFrm.current?.open();
  //       break;
  //     case 'security settings':
  //       securitySettingFrm.current?.open();
  //       break;
  //     case 'signout': {
  //       const data = {
  //         userId: authStore.authToken?.userId,
  //         refreshToken: authStore.authToken?.refreshToken,
  //       };
  //       db.httpPost<null, any>('auth/logout', data, false).then(() => {
  //         authStore.logout();
  //       });
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  // };

  // const showManageUser = useMemo(() => {
  //   return (
  //     authStore.authToken?.organization.organizationType === EOrganizationType.Phaeno ||
  //     authStore.authToken?.user.isAdmin
  //   );
  // }, [authStore.authToken]);

  // const showApiKeys = useMemo(() => {
  //   return (
  //     authStore.authToken?.organization.organizationType === EOrganizationType.Customer &&
  //     authStore.authToken?.user.isAdmin
  //   );
  // }, [authStore.authToken]);

  const filteredMenuList = useMemo(() => {
    const isNarrow = width < 575;

    return userMenuList.filter((item) => {
      let retValue = false;

      retValue = isNarrow ? true : !item.isMain;

      // if (item.subtype === 'manage users') {
      //   return retValue && showManageUser;
      // }

      // if (item.subtype === 'api keys') {
      //   return retValue && showApiKeys;
      // }

      return retValue;
    });
  }, [width])//[width, showManageUser, showApiKeys]);
  

  useEffect(() => {
    if (!opened || !menuRef.current) {
      return;
    }

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href]:not([tabindex="-1"]), button:not([disabled])'
    );

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      const elements = Array.from(focusableElements);
      const index = elements.indexOf(document.activeElement as HTMLElement);

      if (e.key === 'Escape') {
        close();
        burgerRef.current?.focus();
      }

      if (e.key === 'Tab' && focusableElements.length > 0) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (index + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (index - 1 + focusableElements.length) % focusableElements.length;
        focusableElements[prevIndex].focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !burgerRef.current?.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [opened, close]);

  const buttonHndl = (subType: string) => {

  }  

  return (
    <nav className="relative">
      <SecuritySettings ref={securitySettingFrm} />
      <ApiKeys ref={apiKeysFrm} />
      <Burger
        ref={burgerRef}
        className="menu-burger"
        color="black"
        opened={opened}
        lineSize={baseRoute === 'manage-users' ? 4 : 2}
        onClick={toggle}
        aria-label="Toggle navigation"
      />
      <div ref={menuRef} className="dropdown-menu-container">
        <Collapse in={opened} transitionDuration={150} transitionTimingFunction="linear">
          <div>
            <div className="bg-black">
              <CurrentUser />
              <SelectedOrganization onSelectOrganization={() => close()} />
            </div>
            <ul className="dropdown-menu">
              {filteredMenuList.map((item) => (
                <MenuItem key={item.index} item={item} onClick={() => buttonHndl(item.subtype)} />
              ))}
            </ul>
          </div>
        </Collapse>
      </div>
    </nav>
  );
}
