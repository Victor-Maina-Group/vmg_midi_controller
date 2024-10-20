import { createContext, PropsWithChildren, useContext } from "react";

function openWebsocket() {
  const hostname = window.location.hostname;
  const port = 8080;
  const searchParams = new URLSearchParams({ portName: "vmgapp" });
  const url = new URL(`ws://${hostname}:${port}/ws?${searchParams.toString()}`);
  const ws = new WebSocket(url);

  ws.onopen = () => console.log("Web socket connected to " + url.host);

  return ws;
}

export const websocketContext = createContext(openWebsocket());

export interface WebsocketContext {
  socket: WebSocket;
}

export function useWebsocket(): WebsocketContext {
  const ws = useContext(websocketContext);

  return {
    socket: ws!,
  };
}

export function WebSocketProvider({ children }: PropsWithChildren) {
  const ws = openWebsocket();
  return (
    <websocketContext.Provider value={ws}>{children}</websocketContext.Provider>
  );
}
