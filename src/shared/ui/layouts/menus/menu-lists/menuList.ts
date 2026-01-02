import IMenuListItem from "../../types/IMenuListItem";

export const userMenuList: IMenuListItem[] = [
  {
    index: 0,
    isMain: true,
    type: 'link',
    subtype: 'browser',
    label: 'Browser',
    route: '/app/browser',
    userDataRoute: true,
    roles: null
  },
  {
    index: 1,
    isMain: true,
    type: 'link',
    subtype: 'analytics',
    label: 'Analytics',
    route: '/app/analytics',
    userDataRoute: true,
    roles: null
  },  
  {
    index: 2,
    isMain: true,
    type: 'link',
    subtype: 'files',
    label: 'Files',
    route: '/app/files',
    userDataRoute: true,
    roles: null
  },
  {
    index: 3,
    isMain: false,
    type: 'link',
    subtype: 'customers',
    label: 'Customers',
    route: '/app/customers',
    userDataRoute: false,
    roles: ['phaeno-admin', 'phaeno-user'],
  },  
  {
    index: 4,
    isMain: false,
    type: 'link',
    subtype: 'users',
    label: 'Users',
    route: '/app/users',
    userDataRoute: false,
    roles: ['customer-admin', 'partner-admin', 'phaeno-admin']
  },
  {
    index: 5,
    isMain: false,
    type: 'button',
    subtype: 'settings',
    label: 'Settings & Security...',
    route: 'none',
    userDataRoute: false,
    roles: null
  },
  {
    index: 6,
    isMain: false,
    type: 'button',
    subtype: 'signout',
    label: 'Sign Out',
    route: 'none',
    userDataRoute: false,
    roles: null
  },
];