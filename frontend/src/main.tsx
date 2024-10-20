import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import { useWebsocket } from "./hooks/useWebsocket";

declare module "@tanstack/react-router" {
  interface Registerimport {
    router: typeof router;
  }
}

const App = () => {
  const ctx = useWebsocket();
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
