import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export function openWebsocket() {
  const hostname = window.location.hostname;
  const port = 8080;
  const searchParams = new URLSearchParams({ portName: "vmgapp" });
  const url = new URL(`ws://${hostname}:${port}/ws?${searchParams.toString()}`);
  const ws = new WebSocket(url);

  return ws;
}

const websocketContext = createContext<MutableRefObject<WebSocket> | null>(
  null,
);

export function useWebsocket() {
  type WebSocketReadyState = "open" | "closed" | "connecting";
  const [state, setState] = useState<WebSocketReadyState>("closed");
  const socketRef = useContext(websocketContext);

  function reconnectSocket() {
    console.log(socketRef?.current);
    if (socketRef?.current) {
      setState("connecting");
      console.log("Reconnecting...");
      socketRef.current = openWebsocket();
    }
  }

  useEffect(() => {
    const ws = socketRef?.current;
    if (!ws) return;

    ws.onopen = () => setState("open");
    ws.onclose = () => setState("closed");
  }, [socketRef?.current, state]);

  return {
    socketRef,
    reconnectSocket,
    socketState: state,
  };
}

export function WebSocketProvider({ children }: PropsWithChildren) {
  const wsRef = useRef(openWebsocket());

  return (
    <websocketContext.Provider value={wsRef}>
      {children}
    </websocketContext.Provider>
  );
}
