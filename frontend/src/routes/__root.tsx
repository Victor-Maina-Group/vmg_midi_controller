import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ControllerLayout } from "@/layouts/controllers";

const TanStackRouterDevTools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  component: React.memo(() => (
    <ControllerLayout>
      <Outlet />
      <TanStackRouterDevTools />
    </ControllerLayout>
  )),
});
