import { requireAreaAccess, requireAuth, requireRole, requireScope  } from "@/auth/auth.guards";
import { CustomerListPage } from "@/features/customers/CustomerListPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/customers/")({
  beforeLoad: requireScope("phaeno"),
  component: CustomerListPage,
});