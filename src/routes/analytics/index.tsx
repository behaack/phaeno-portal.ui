import { createFileRoute } from "@tanstack/react-router";
import { DataAnalyticsPage } from "@/_features/data-analytics/DataAnalyticsPage";

export const Route = createFileRoute("/analytics/")({
  component: DataAnalyticsPage
});