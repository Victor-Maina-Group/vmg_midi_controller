import React, { useEffect } from "react";
import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { ControllerLayout } from "@/layouts/controllers";

const TanStackRouterDevTools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  component: React.memo(() => {
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
