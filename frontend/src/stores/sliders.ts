import { create } from "zustand/react";

export type SliderData = {
  id: number;
  value: number;
  name?: string;
  displayUnit?: "db" | "percent";
};

export type GroupNum = 1 | 2 | 3 | 4;
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

export type SliderStoreState = {
  data: SliderGroups;
};

export type SliderStoreActions = {
  update: (params: SliderUpdateParams) => void;
};

const init: SliderStoreState = { data: createInit() };

export const useSliderStore = create<SliderStoreState & SliderStoreActions>()((
  set,
) => {
  return {
    ...init,
    update: ({ group, sliderIndex, field, value }) => {
      set((state) => {
        const updated = { ...state };
        updated.data[group][sliderIndex][field] = value;
        return updated;
      });
    },
  };
});
