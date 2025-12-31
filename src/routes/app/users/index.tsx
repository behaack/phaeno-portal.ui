import { requireScope  } from "@/auth/auth.guards";
import { UserListPage } from "@/features/users/UserListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/")({
  beforeLoad: requireScope("phaeno"),
  component: UserListPage,
});