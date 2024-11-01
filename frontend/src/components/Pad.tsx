import { useRef, useState } from "react";
import { Button } from "./Button";
import { useEventListener } from "@/hooks/useEventListener";
import { PadData } from "@/store/pads";
import { useStore } from "zustand";
import { boundStore } from "@/store";

type PadPropsType = {
  padData: PadData;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Pad(props: PadPropsType) {
  const [is_active, set_is_active] = useState(false);
  const button_ref = useRef<HTMLButtonElement>(null);
  const { label, note, midi_number } = props.padData;

  useEventListener({
    ref: button_ref,
    ev: "pointerdown",
    handler: () => {
      set_is_active(true);
      note_on();
    },
  });

  useEventListener({
    ref: button_ref,
    ev: "pointerleave",
    handler: () => {
      set_is_active(false);
      note_off();
    },
  });

  // Prevent scrolling on touch screen devices.
  useEventListener({
    ref: button_ref,
    handler: (e) => {
      e.preventDefault();
    },
    ev: "touchmove",
    options: { passive: false },
  });

  const socket = useStore(boundStore, (state) => state.socket);
  function note_on() {
    if (!socket) return;
    const message = [
      144 /* MIDI status byte for note-on on Channel 1 */,
      midi_number(),
      127,
    ];
    socket.send(JSON.stringify(message));
  }

  function note_off() {
    if (!socket) return;
    const message = [
      128 /* MIDI status byte for note-off on Channel 1 */,
      midi_number(),
      0,
    ];
    socket.send(JSON.stringify(message));
  }

  return (
    <Button
      ref={button_ref}
      className={`relative flex-1 !rounded-2xl !p-1 ${is_active ? "!bg-gray-400 hover:!bg-gray-400" : ""} p-text-sm/none !p-4 font-bold text-gray-900 ${props.className}`}
    >
      <div className="absolute inset-1 z-0 rounded-xl border-[2px] border-white p-4"></div>
      <div className="flex h-full flex-1 flex-col justify-between">
        <div className="text-left">{label}</div>

        <div className="text-right">
          <span>{note.key}</span>
          <span className="text-gray-700">{note.octave}</span>
        </div>
      </div>
      {props.children}
    </Button>
  );
}
