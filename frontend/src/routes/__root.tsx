import { memo, lazy } from "react";
import {
  createRootRoute,
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { ControllerLayout } from "@/layouts/controllers";
import { WebsocketContext } from "@/hooks/useWebsocket";

const TanStackRouterDevTools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRouteWithContext<WebsocketContext>()({
  component: memo(() => {
    const isLoading = useRouter().state.isLoading;

    if (isLoading) return <div>Loading...</div>;

    return (
      <>
        <ControllerLayout>
          <Outlet />
        </ControllerLayout>
        <TanStackRouterDevTools />
      </>
    );
  }),
});
