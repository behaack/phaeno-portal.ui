import { createFileRoute } from "@tanstack/react-router"
import { LoginPage } from "@/_features/auth/LoginPage"

export const Route = createFileRoute("/auth/sign-in/")({
  component: LoginPage,
})