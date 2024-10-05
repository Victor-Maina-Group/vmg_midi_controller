import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_controllers/")({
  component: () => {
    return <Outlet />;
  },
});
