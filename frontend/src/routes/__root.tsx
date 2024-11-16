import { memo, lazy } from "react";
import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { ControllerLayout } from "@/layouts/controllers";
import { useStore } from "zustand";
import { boundStore } from "@/store";
const TanStackRouterDevTools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  component: memo(RootComponent),
  loader: ({ route, location }) => {
    const is_socket_open = boundStore.getState().is_socket_open;
    if (route.to !== location.href && !is_socket_open) {
      throw redirect({ to: route.to });
    }
  },
});

function RootComponent() {
  const is_socket_open = useStore(boundStore, (state) => state.is_socket_open);

  return (
    <>
      <ControllerLayout>{is_socket_open && <Outlet />}</ControllerLayout>
      <TanStackRouterDevTools />
    </>
  );
}
