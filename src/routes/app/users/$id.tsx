import { UserDetailsPage } from "@/features/users/UserDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/$id")({
  component: UserDetailsPage,
});