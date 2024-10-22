import { createStore } from "zustand";
import { createSliderSlice, SliderSlice } from "./sliders";
import { createLastGroupSlice, LastGroupSlice } from "./lastGroup";

export const boundStore = createStore<SliderSlice & LastGroupSlice>((...a) => ({
  ...createSliderSlice(...a),
  ...createLastGroupSlice(...a),
}));
