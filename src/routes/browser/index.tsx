import { BrowserIndexPage } from "@/_features/browser/BrowserIndexPage";
import { browserSearchValidator } from "@/_features/browser/routeValidators/browserSearchValidator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/browser/")({
  validateSearch: (search) => browserSearchValidator.parse(search),
  component: BrowserIndexPage,
});