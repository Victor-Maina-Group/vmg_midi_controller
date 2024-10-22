import * as Slider from "@radix-ui/react-slider";
import { useEffect, useRef, useState } from "react";
import { useEventListener } from "@/hooks/useEventListener";
import { GroupNum, SliderUpdateParams } from "@/store/sliders";
import { Pill } from "./Pill";
import { useWebsocket } from "@/hooks/useWebsocket";
import { useStore } from "zustand";
import { boundStore } from "@/store";

type SliderPropsType = {
  sliderIndex: number;
  group: GroupNum;
};

export default ({ sliderIndex, group }: SliderPropsType) => {
  const ref = useRef<HTMLSpanElement>(null);
  const value = useStore(
    boundStore,
    (state) => state.slidersData[group][sliderIndex].value,
  );
  const { id, name, displayUnit } = useStore(
    boundStore,
    (state) => state.slidersData[group][sliderIndex],
  );
  const update = useStore(boundStore, (state) => state.slidersUpdate);

  function handleChange(input: number[]) {
    const value = input[0] as never;
    const params: SliderUpdateParams = {
      group,
      sliderIndex: sliderIndex,
      field: "value",
      value,
    };
    update(params);
  }

  // Prevent scrolling on touch screen devices.
  useEventListener({
    ref,
    handler: (e) => {
      e.preventDefault();
    },
    ev: "touchmove",
    options: { passive: false },
  });

  // Send MIDI message only if slider val changes, not on render
  const { socket } = useWebsocket();
  const [prevValue, setPrevValue] = useState(value); // Diff current val with previous val
  useEffect(() => {
    if (prevValue !== value) {
      const midi_message = [176, id, value];
      socket.send(JSON.stringify(midi_message));
      setPrevValue(value);
    }
  }, [value]);

  return (
    <div className="flex min-w-12 flex-col items-center gap-4">
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
      {name && <span className="text-[min(4vh,1rem)] font-medium">{name}</span>}
    </div>
  );
};
