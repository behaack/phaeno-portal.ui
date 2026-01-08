import { ForgotPasswordPage } from "@/features/auth/ForgotPasswordPage."
import { ResetPasswordPage } from "@/features/auth/ResetPasswordPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/password-reset/$token")({
  component: ResetPasswordPage
})
