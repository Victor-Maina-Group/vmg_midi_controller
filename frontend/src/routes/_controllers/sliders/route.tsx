import { lastGroupStore } from "@/stores/lastGroup";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Route as sliderGroupRoute } from "./$groupId";

export const Route = createFileRoute("/_controllers/sliders")({
  component: () => {
    return <Outlet />;
  },
  shouldReload: false,
  beforeLoad: ({ params }) => {
    const { sliders } = lastGroupStore.getState();
    if (!params.hasOwnProperty("groupId")) {
      throw redirect({ to: sliderGroupRoute.to, params: { groupId: sliders } });
    }
  },
  pendingMs: 500,
  pendingMinMs: 500,
  pendingComponent: () => <div>Loading sliders...</div>,
});
