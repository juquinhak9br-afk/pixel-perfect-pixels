import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Shell } from "@/components/fz/ui";

export const Route = createFileRoute("/app")({
  component: () => (
    <Shell variant="client">
      <Outlet />
    </Shell>
  ),
});
