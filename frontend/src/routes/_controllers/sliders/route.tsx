import { lastGroupStore } from "@/stores/lastGroup";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Route as sliderGroupRoute } from "./$groupId";

export const Route = createFileRoute("/_controllers/sliders")({
  component: () => {
    return <Outlet />;
  },
  shouldReload: false,
  beforeLoad: () => {
    const { sliders } = lastGroupStore.getState();
    redirect({ to: sliderGroupRoute.to, params: { groupId: sliders } });
  },
});
