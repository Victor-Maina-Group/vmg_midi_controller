import { StateCreator } from "zustand";

type MIDISocketEventHandlerType = (ev?: Event) => void;
export type MIDISocketSlice = {
  socket: WebSocket | null;
  options: {
    hostname: string;
    port: number;
    params: Record<string, string>;
  };
  set_options: (options: Partial<MIDISocketSlice["options"]>) => void;
  url: (to_string?: boolean) => URL | string;
  handlers: {
    onopen: MIDISocketEventHandlerType[];
    onclose: MIDISocketEventHandlerType[];
    onmessage: MIDISocketEventHandlerType[];
  };
  add_handler: (
    type: "onopen" | "onclose" | "onmessage",
    handler: () => void,
  ) => void;
  open_socket: () => WebSocket | null;
  close_socket: () => void;
  is_socket_open: /* (() => boolean) */ boolean;
};

export const create_midi_socket_slice: StateCreator<MIDISocketSlice> = (
  set,
  get,
) => {
  return {
    socket: null,
    options: {
      hostname: /* "localhost" */ window.location.hostname,
      port: !isNaN(parseInt(window.location.port))
        ? parseInt(window.location.port)
        : 8080,
      params: { portName: "vmgapp" },
    },
    set_options: (options) => {
      set((state) => {
        return { ...state, options: { ...state.options, options } };
      });

      // Open new websocket with updated options
      /* set((state) => {
        if (state.socket) state.socket.close();
        state.open_socket();
        return state;
      }); */
    },

    /** Append a new event handler for the websocket  */
    add_handler: (type, handler) => {
      set((state) => {
        const updated = { ...state };
        updated.handlers[type].push(handler);
        return updated;
      });
    },

    /** Creates a new WebSocket connection and attaches all the event handlers */
    open_socket: () => {
      //Open new websocket
      set((state) => {
        const updated = { ...state };
        updated.socket = new WebSocket(state.url());
        return updated;
      });

      get().add_handler("onopen", () =>
        set((state) => ({
          ...state,
          is_socket_open: state.socket?.readyState === 1,
        })),
      );

      get().add_handler("onclose", () =>
        set((state) => ({
          ...state,
          is_socket_open: state.socket?.readyState === 1,
        })),
      );

      // Attach the added handlers to the websocket
      const socket = get().socket;
      if (!socket) return null;

      const events = ["onopen", "onclose", "onmessage"] as const;
      events.forEach((ev) => {
        socket[ev] = () => {
          get().handlers[ev].forEach((handler) => handler());
          get().handlers[ev].length = 0;
        };
      });

      return socket;
    },

    /** Close the websocket connection. */
    close_socket: () => {
      const socket = get().socket;
      if (socket) socket.close();
    },

    handlers: {
      onopen: [],
      onclose: [],
      onmessage: [],
    },

    /** Compute a `URL` object or a string url using the saved options  */
    url: (to_string) => {
      const state = get();
      const hostname = state.options.hostname || window.location.hostname;
      const port = state.options.port || 8080;
      const searchParams = new URLSearchParams(
        state.options.params || { portName: "vmgapp" },
      );
      const url = new URL(
        `ws://${hostname}:${port}/ws?${searchParams.toString()}`,
      );

      return to_string ? url.toString() : url;
    },
    /* is_socket_open: () => {
      const socket = get().socket;
      if (socket && socket.readyState === socket.OPEN) return true;
      else return false;
    }, */
    is_socket_open: false,
  };
};

// Hooks
// export function is_socket_open() {
//   const socket;
// }
