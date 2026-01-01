import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsIndexPage } from "@/features/analytics/AnalyticsIndexPage";

export const Route = createFileRoute("/app/analytics")({
  component: AnalyticsIndexPage
});