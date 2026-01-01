import { FilesIndexPage } from "@/features/files/FilesIndexPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/app/files')({
  component: FilesIndexPage,
});
