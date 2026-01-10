import { useMemo } from 'react'
import {
  IconBrowser,
  IconBuilding,
  IconFile,
  IconHome,
  IconLogout,
  IconMath,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import { Link, useLocation } from '@tanstack/react-router'
import IUserMenuItem from '../types/IMenuListItem'

export interface IProps {
  item: IUserMenuItem
  onClick?: () => void
}

export function MenuItem({ item, onClick }: IProps) {
  const location = useLocation()
  const size = 18

  const baseRoute = useMemo(() => {
    const currentRoute = location.pathname
    return currentRoute.toLowerCase().split('/')[1]
  }, [location.pathname])

  const icon = useMemo(() => {
    switch (item.subtype) {
      case 'home':
        return <IconHome size={size} />
      case 'files':
        return <IconFile size={size} />
      case 'browser':
        return <IconBrowser size={size} />
      case 'analytics':
        return <IconMath size={size} />
      case 'customers':
        return <IconBuilding size={size} />
      case 'users':
        return <IconUsers size={size} />
      case 'settings':
        return <IconSettings size={size} />
      case 'signout':
        return <IconLogout size={size} />
    }
  }, [item.subtype])

  const link = (
    <Link
      to={item.route}
      className={`${item.route === baseRoute ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="menu-label">
        {icon} {item.label}
      </span>
    </Link>
  )

  const buttonItem = (
    <button
      className={`dropdown-menu-button ${item.route === baseRoute ? 'active' : ''}`}
      type="button"
      onClick={onClick}
    >
      <div className="item-label">
        {icon}
        <span>{item.label}</span>
      </div>
    </button>
  )

  return <li>{item.type === 'link' ? link : buttonItem}</li>
}
