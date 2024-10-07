import { lastGroupStore } from "@/stores/lastGroup";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Route as padsGroupRoute } from "./$groupId";

export const Route = createFileRoute("/_controllers/pads")({
  component: () => {
    return <Outlet />;
  },
  beforeLoad: () => {
    const { pads } = lastGroupStore.getState();
    redirect({ to: padsGroupRoute.to, params: { groupId: pads } });
  },
});
