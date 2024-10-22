export type SocketOptions = {
  host: string;
  port: number;
  params: Record<string, string>;
};

export function openSocket(opts?: SocketOptions) {
  const hostname = opts?.host || window.location.hostname;
  const port = opts?.port || 8080;
  const searchParams = new URLSearchParams(
    opts?.params || { portName: "vmgapp" },
  );
  const url = new URL(`ws://${hostname}:${port}/ws?${searchParams.toString()}`);
  const socket = new WebSocket(url);

  return socket;
}

export type SocketContext = ReturnType<typeof openSocket>;
