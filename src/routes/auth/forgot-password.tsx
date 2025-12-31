import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/forgot-password")({
  component: ForgotPassword
})

function ForgotPassword() {
  return <div>Forgot password here</div>
}