import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Route as padsGroupRoute } from "./$groupId";
import { boundStore } from "@/store";

export const Route = createFileRoute("/control/pads")({
  component: () => {
    return <Outlet />;
  },
  beforeLoad: ({ params }) => {
    const pads = boundStore.getState().lastPadGroup;
    if (!params.hasOwnProperty("groupId")) {
      throw redirect({ to: padsGroupRoute.to, params: { groupId: pads } });
    }
  },
});
