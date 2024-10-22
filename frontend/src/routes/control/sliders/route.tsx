import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Route as sliderGroupRoute } from "./$groupId";
import { boundStore } from "@/store";

export const Route = createFileRoute("/control/sliders")({
  component: () => {
    return <Outlet />;
  },
  shouldReload: false,
  beforeLoad: ({ params }) => {
    const sliders = boundStore.getState().lastSliderGroup;
    if (!params.hasOwnProperty("groupId")) {
      throw redirect({ to: sliderGroupRoute.to, params: { groupId: sliders } });
    }
  },
  pendingMs: 500,
  pendingMinMs: 500,
  pendingComponent: () => <div>Loading sliders...</div>,
});
