import { memo, lazy, useEffect, useState } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ControllerLayout } from "@/layouts/controllers";
import { openSocket, SocketContext } from "@/utils/socket";
import { SocketLoadingComponent } from "@/components/WebsocketStatus";

const TanStackRouterDevTools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

export const Route = createRootRouteWithContext<SocketContext>()({
  component: memo(RootComponent),
});

function RootComponent() {
  const [state, setState] = useState<WebSocket["readyState"]>(0);
  const socket = Route.useRouteContext();

  useEffect(() => {
    socket.onopen = () => {
      socket = openSocket();
      setState(socket.OPEN);
    };
    socket.onclose = () => setState(socket.CLOSED);
  }, [socket]);

  if (state !== ctx.socket.OPEN) {
    return (
      <SocketLoadingComponent
        readyState={state}
        reconnectSocket={ctx.reconnectSocket}
      />
    );
  }

  return (
    <>
      <ControllerLayout>
        <Outlet />
      </ControllerLayout>
      <TanStackRouterDevTools />
    </>
  );
}
