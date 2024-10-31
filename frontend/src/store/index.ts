import { createStore } from "zustand";
import { createSliderSlice, SliderSlice } from "./sliders";
import { createLastGroupSlice, LastGroupSlice } from "./lastGroup";
import { create_midi_socket_slice, MIDISocketSlice } from "./midi_socket";

type BoundStoreSlices = SliderSlice & LastGroupSlice & MIDISocketSlice;
export const boundStore = createStore<BoundStoreSlices>((...a) => ({
  ...createSliderSlice(...a),
  ...createLastGroupSlice(...a),
  ...create_midi_socket_slice(...a),
}));
