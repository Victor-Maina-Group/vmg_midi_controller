import { Button } from "./Button";

type SocketLoadingComponent = {
  readyState: WebSocket["readyState"];
  reconnectSocket: () => void;
};
export function SocketLoadingComponent(props: SocketLoadingComponent) {
  switch (props.readyState) {
    case WebSocket.OPEN:
      return <div>Connecting to MIDI host...</div>;
    case WebSocket.CLOSED || WebSocket.CLOSING:
      return <WebSocketClosedComponent reconnect={props.reconnectSocket} />;
    default:
      return null;
  }
}

type WebSocketClosedComponentProps = { reconnect: () => void };
function WebSocketClosedComponent({
  reconnect,
}: WebSocketClosedComponentProps) {
  function handleConnect() {
    reconnect();
  }
  return (
    <div>
      <span>Disconnected from host.</span>
      <Button onClick={handleConnect}>Reconnect</Button>
    </div>
  );
}
