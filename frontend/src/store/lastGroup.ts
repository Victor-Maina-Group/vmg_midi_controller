import { StateCreator } from "zustand";

export type GroupType = "sliders" | "pads";
export type GroupNum = "1" | "2" | "3" | "4" | 1 | 2 | 3 | 4;
export type LastGroupSlice = {
  lastSliderGroup: GroupNum;
  lastPadGroup: GroupNum;
  lastGroupUpdate: (group: GroupType, val: GroupNum) => void;
};

export const createLastGroupSlice: StateCreator<LastGroupSlice> = (set) => {
  return {
    lastSliderGroup: "1",
    lastPadGroup: "1",
    lastGroupUpdate: (group, val) => {
      set((state) => {
        console.log(state.lastSliderGroup, state.lastPadGroup);
        return { ...state, [group]: val };
      });
    },
  };
};
