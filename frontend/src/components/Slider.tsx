import * as Slider from "@radix-ui/react-slider";
import { useRef } from "react";
import { useEventListener } from "@/hooks/useEventListener";
import { GroupNum, SliderUpdateParams, useSliderStore } from "@/stores/sliders";
import { Pill } from "./Pill";

type SliderPropsType = {
  id: number;
  group: GroupNum;
};

export default ({ id, group }: SliderPropsType) => {
  const ref = useRef<HTMLSpanElement>(null);
  const value = useSliderStore((state) => state.data[group][id].value);
  const { name, displayUnit } = useSliderStore(
    (state) => state.data[group][id],
  );
  const update = useSliderStore((state) => state.update);

  function handleChange(input: number[]) {
    const value = input[0] as never;
    const params: SliderUpdateParams = {
      group,
      sliderIndex: id,
      field: "value",
      value,
    };
    update(params);
  }

  useEventListener({
    ref,
    handler: (e) => {
      e.preventDefault();
    },
    ev: "touchmove",
    options: { passive: false },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <Pill className="flex min-w-14 flex-row items-center justify-center gap-1">
        <span>{value}</span>
        {displayUnit !== undefined && (
          <span className="text-sm font-semibold text-gray-600">
            {displayUnit}
          </span>
        )}
      </Pill>
      <Slider.Root
        ref={ref}
        className="group relative h-full w-8 flex-1 flex-col items-center"
        orientation="vertical"
        value={[value]}
        onValueChange={handleChange}
        min={0}
        max={127}
      >
        <Slider.Track className="absolute inset-0 h-full w-full overflow-clip rounded-full bg-gray-200">
          <Slider.Range className="absolute w-full bg-gray-400" />
        </Slider.Track>
        <Slider.Thumb className="block h-12 w-12 -translate-x-2 rounded-full bg-gray-500 transition-transform group-hover:scale-110" />
      </Slider.Root>
      {name && <span className="font-medium">{name}</span>}
    </div>
  );
};
