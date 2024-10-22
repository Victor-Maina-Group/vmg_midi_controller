import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { openSocket } from "./utils/socket";

const socket = openSocket();

export const router = createRouter({
  routeTree,
  defaultPendingMs: 1000,
  context: {
    socket,
  },
});
