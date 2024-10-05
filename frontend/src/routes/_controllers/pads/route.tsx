import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_controllers/pads")({
  component: () => {
    return <Outlet />;
  },
  beforeLoad: ({ context, params }) => {},
});
