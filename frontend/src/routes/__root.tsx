import { memo, lazy } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
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
