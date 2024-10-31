import { memo, lazy, useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ControllerLayout } from "@/layouts/controllers";
import { Button } from "@/components/Button";
import { useStore } from "zustand";
import { boundStore } from "@/store";
import { logger } from "@/utils/logger";

const TanStackRouterDevTools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRoute({
  component: memo(RootComponent),
});

function RootComponent() {
  const is_socket_open = useStore(boundStore, (state) => state.is_socket_open);
  const open_socket = useStore(boundStore, (state) => state.open_socket);

  function handle_reconnect() {
    open_socket();
  }

  return (
    <>
      <ControllerLayout>
        {is_socket_open ? (
          <Outlet />
        ) : (
          <DisconnectedComponent handle_reconnect={handle_reconnect} />
        )}
      </ControllerLayout>
      <TanStackRouterDevTools />
    </>
  );
}

function DisconnectedComponent(props: { handle_reconnect: () => void }) {
  return (
    <div>
      <span>Disconnected from host.</span>
      <Button onClick={() => props.handle_reconnect()}>Reconnect</Button>
    </div>
  );
}
