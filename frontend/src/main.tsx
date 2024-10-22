import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router";
import { RouterProvider } from "@tanstack/react-router";

declare module "@tanstack/react-router" {
  interface Registerimport {
    router: typeof router;
  }
}

const App = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
