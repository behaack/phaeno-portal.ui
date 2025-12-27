import { useMemo } from 'react';
import { useLocation } from '@tanstack/react-router';
import { constants } from '@/assets/constants';
import { useDeviceSize } from '@/hooks/useDeviceSize';
import { useAuthStore } from '@/stores/authStore';
import DropdownMenu from './DropdownMenu';
import Menu from './Menu';

export default function AuthHeader() {
  const location = useLocation();
  const authStore = useAuthStore();
  const [width] = useDeviceSize();

  const baseRoute = useMemo(() => {
    const currentRoute = location.pathname;
    return currentRoute.toLowerCase().split('/')[1];
  }, [location.pathname]);

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-inner">
          <div className="flex items-center">
            <div className="logo-group">
              <img
                className="logo"
                alt="Phaeno logo"
                src={`${constants.IMAGES_URL}/phaeno180x58.png`}
              />
            </div>
          </div>
          {authStore.isAuthenticated ? (
            <div className="flex items-center gap-2">
              {width < 575 ? null : <Menu />}
              <DropdownMenu baseRoute={baseRoute} />
            </div>
          ) : (
            <div className="text-md font-semibold">Welcome to Phaeno's <br /> PSeq Customer Portal</div>
          )}
        </div>
      </div>
    </header>
  );
}
