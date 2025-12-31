import { useMemo } from 'react';
import { useLocation } from '@tanstack/react-router';
import { useDeviceSize } from '@/shared/hooks/useDeviceSize';
import { useAuthStore } from '@/stores/auth.store';
import { DropdownMenu } from '../menus/DropdownMenu';
import { Menu } from '../menus/Menu';
import { HeaderContainer } from './HeaderContainer';

export function AppHeader() {
  const location = useLocation();
  const authStore = useAuthStore();
  const [width] = useDeviceSize();

  const baseRoute = useMemo(() => {
    const currentRoute = location.pathname;
    return currentRoute.toLowerCase().split('/')[1];
  }, [location.pathname]);

  return (
    <HeaderContainer>
      <>
        {width < 575 ? null : <Menu />}
        <DropdownMenu baseRoute={baseRoute} />
      </>
    </HeaderContainer>
  );
}
