import React from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const TanStackRouterDevTools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevTools />
    </>
  ),
});
