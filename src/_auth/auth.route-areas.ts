export const ROUTE_AREAS = {
  APP: "app",
  ADMIN: "admin",
  CUSTOMER: "customer",
  PARTNER: "partner",
  SETTINGS: "settings",
} as const

export type RouteArea = typeof ROUTE_AREAS[keyof typeof ROUTE_AREAS]