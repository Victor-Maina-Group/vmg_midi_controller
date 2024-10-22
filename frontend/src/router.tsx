import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPendingMs: 1000,
  context: {
    socketRef: undefined!,
    socketState: undefined!,
  },
});
