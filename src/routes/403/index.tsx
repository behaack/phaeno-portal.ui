import { NotAuthorizedPage } from "@/_features/not-authorized/NotAuthorizedPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/403/")({
  component: NotAuthorizedPage,
});

