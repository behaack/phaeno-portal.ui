import { requireAuth } from "@/auth/auth.guards";
import { BrowserIndexPage } from "@/features/browser/BrowserIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/browser")({
  beforeLoad: requireAuth,
  component: BrowserIndexPage,
});