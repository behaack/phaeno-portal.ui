import { CustomerDetailsPage } from "@/features/customers/CustomerDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/customers/$id")({
  component: CustomerDetailsPage,
});