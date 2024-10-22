import { useWebsocket } from "@/hooks/useWebsocket";
import { Button } from "./Button";

export function WebSocketLoaderComponent() {
  const { socketState } = useWebsocket();

  console.log(socketState);

  if (socketState === "connecting") {
    return <div>Connecting to MIDI host...</div>;
  }

  if (socketState === "closed") {
    return <WebSocketClosedComponent />;
  }
}

function WebSocketClosedComponent() {
  const { reconnectSocket } = useWebsocket();
  function handleConnect() {
    reconnectSocket();
  }
  return (
    <div>
      <span>Disconnected from host.</span>
      <Button onClick={handleConnect}>Reconnect</Button>
    </div>
  );
}
