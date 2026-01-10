export const ROLES = {
  PHAENO_USER: 'phaeno-user',
  PHAENO_ADMIN: 'phaeno-admin',

  CUSTOMER_USER: 'customer-user',
  CUSTOMER_ADMIN: 'customer-admin',

  PARTNER_USER: 'partner-user',
  PARTNER_ADMIN: 'partner-admin',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]
