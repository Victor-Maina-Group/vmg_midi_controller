import { ForwardedRef, forwardRef, PropsWithChildren } from "react";
import { Button } from "./Button";

type SliderPropsType = {
  displayUnin: "db" | "percent" | "cc";
  value: number;
};
export function Slider() {
  return (
    <SliderTrack>
      <Knob />
    </SliderTrack>
  );
}

type SliderTrackProps = {} & PropsWithChildren;
const SliderTrack = forwardRef(
  (props: SliderTrackProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className="relative flex h-full w-8 justify-center rounded-full bg-gray-200"
      >
        {props.children}
      </div>
    );
  },
);

type KnobProps = {} & PropsWithChildren;
const Knob = forwardRef(
  (props: KnobProps, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <Button
        ref={ref}
        className="absolute h-12 w-12 rounded-full bg-gray-400 transition-transform hover:scale-110 hover:bg-gray-400 active:bg-gray-500"
      ></Button>
    );
  },
);
