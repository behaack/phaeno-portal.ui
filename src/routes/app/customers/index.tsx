import { requireAreaAccess, requireAuth, requireRole, requireScope  } from "@/auth/auth.guards";
import { CustomerIndexPage } from "@/features/customers/CustomerIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/customers/")({
  beforeLoad: requireScope("phaeno"),
  component: CustomerIndexPage,
});