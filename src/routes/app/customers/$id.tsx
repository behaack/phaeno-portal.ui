import { createFileRoute } from '@tanstack/react-router'
import { CustomerDetailsPage } from '@/features/customers/CustomerDetailsPage'

export const Route = createFileRoute('/app/customers/$id')({
  component: CustomerDetailsPage,
})
