import { BrowserIndexPage } from "@/_features/browser/BrowserIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/browser/")({
  component: BrowserIndexPage,
});