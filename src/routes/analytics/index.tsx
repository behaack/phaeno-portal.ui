import { createFileRoute } from "@tanstack/react-router";
import { DataAnalyticsPage } from "@/_features/data-analytics/DataAnalyticsPage";
import { AnalyticsPage } from "@/_features/analytics/AnalyticsPage";

export const Route = createFileRoute("/analytics/")({
  component: AnalyticsPage
});