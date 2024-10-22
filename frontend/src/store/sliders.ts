import { StateCreator } from "zustand";
import { GroupNum } from "./lastGroup";

export type SliderData = {
  id: number;
  value: number;
  name?: string;
  displayUnit?: "db" | "percent";
};

export type SliderGroup = SliderData[];
export type SliderGroups = Record<GroupNum, SliderGroup>;

function createInitSliderData(id: number) {
  const init: SliderData = {
    id,
    value: 0,
    displayUnit: undefined,
    name: `Slider ${id}`,
  };
  return init;
}

function createInitSliderGroup(first_id: number) {
  const sliderGroup: SliderGroup = [];
  for (let i = 0; i < 6; i++) {
    const initSlider = createInitSliderData(first_id + i);
    sliderGroup.push(initSlider);
  }
  return sliderGroup;
}

export function createInit() {
  const init = {} as SliderGroups;
  let i = 1;
  let first_id = 14;
  while (i <= 4) {
    init[i as GroupNum] = createInitSliderGroup(first_id);
    i++;
    first_id += 6;
  }
  return init;
}

export type SliderUpdateParams = {
  group: GroupNum;
  sliderIndex: number;
  field: keyof SliderData;
  value: never;
};

export type SliderSlice = {
  slidersData: SliderGroups;
  slidersUpdate: (params: SliderUpdateParams) => void;
};

export const createSliderSlice: StateCreator<SliderSlice> = (set) => {
  return {
    slidersData: createInit(),
    slidersUpdate: ({ group, sliderIndex, field, value }) => {
      set((state) => {
        const updated = { ...state };
        updated.slidersData[group][sliderIndex][field] = value;
        return updated;
      });
    },
  };
};
