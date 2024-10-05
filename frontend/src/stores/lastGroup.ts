import { createStore } from "zustand";

export type GroupType = "sliders" | "pads";
export type GroupNumType = "1" | "2" | "3" | "4";
export type LastGroupStateType = {
  sliders: GroupNumType;
  pads: GroupNumType;
  update: (group: GroupType, val: GroupNumType) => void;
};

export const lastGroupStore = createStore<LastGroupStateType>()((set) => {
  return {
    sliders: "1",
    pads: "1",
    update: (group, val) => {
      set((state) => ({ ...state, [group]: val }));
      console.log(group, val);
    },
  };
});
