import * as Slider from "@radix-ui/react-slider";
import {
  TouchEventHandler,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Pill } from "./Pill";
import { useEventListener } from "@/hooks/useEventListener";

type SliderPropsType = {
  displayUnit: "db" | "percent" | undefined;
  value: number;
};

export default ({ displayUnit }: SliderPropsType) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [sliderVals, setSliderVals] = useState<number[]>([0]);
  function handleValChange(val: number[]) {
    setSliderVals(val);
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
        <span>{sliderVals}</span>
        {displayUnit !== undefined && (
          <span className="text-sm font-semibold text-gray-600">
            {displayUnit}
          </span>
        )}
      </Pill>
      <Slider.Root
        ref={ref}
        className="group relative h-full w-12 flex-1 flex-col items-center"
        orientation="vertical"
        onValueChange={handleValChange}
        value={sliderVals}
        min={0}
        max={127}
      >
        <Slider.Track className="absolute inset-0 h-full w-full overflow-clip rounded-full bg-gray-200">
          <Slider.Range className="absolute w-full bg-gray-400" />
        </Slider.Track>
        <Slider.Thumb className="absolute left-0 right-0 h-4 bg-gray-500" />
      </Slider.Root>
    </div>
  );
};

// import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
// import { Button } from "./Button";
//
// export function Slider() {
//   return (
//     <SliderTrack>
//       <Knob />
//     </SliderTrack>
//   );
// }
//
// type SliderTrackProps = {} & PropsWithChildren;
// const SliderTrack = forwardRef(
//   (props: SliderTrackProps, ref: ForwardedRef<HTMLDivElement>) => {
//     return (
//       <div
//         ref={ref}
//         className="relative flex h-full w-8 justify-center rounded-full bg-gray-200"
//       >
//         {props.children}
//       </div>
//     );
//   },
// );
//
// type KnobProps = {} & PropsWithChildren;
// const Knob = forwardRef(
//   (_: KnobProps, ref: ForwardedRef<HTMLButtonElement>) => {
//     return (
//       <Button
//         ref={ref}
//         className="absolute h-12 w-12 rounded-full bg-gray-400 transition-transform hover:scale-110 hover:bg-gray-400 active:bg-gray-500"
//       ></Button>
//     );
//   },
//
// );
