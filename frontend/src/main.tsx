import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { openWebsocket, useWebsocket } from "./hooks/useWebsocket";
import { WebSocketLoaderComponent } from "./components/WebsocketStatus";

declare module "@tanstack/react-router" {
  interface Registerimport {
    router: typeof router;
  }
}

const App = () => {
  const ctx = useWebsocket();
  const { socketRef, reconnectSocket, socketState } = ctx;

  if (socketState != "open") return <WebSocketLoaderComponent />;

  useEffect(() => {
    if (socketRef) socketRef.current = openWebsocket();
  }, [socketState, socketRef]);

  return (
    <StrictMode>
      <RouterProvider router={router} context={ctx} />
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
