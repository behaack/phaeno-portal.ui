import { createFileRoute } from '@tanstack/react-router'
import { ResetPasswordPage } from '@/features/auth/ResetPasswordPage'

export const Route = createFileRoute('/auth/password-reset/$token')({
  component: ResetPasswordPage,
})
