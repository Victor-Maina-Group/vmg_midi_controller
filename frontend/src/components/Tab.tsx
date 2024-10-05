import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./Button";
import { ButtonHTMLAttributes, ForwardedRef, forwardRef, memo } from "react";

type TabPropsType = {
  isActive: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Tab = memo(
  forwardRef(
    ({ isActive, ...props }: TabPropsType, ref: ForwardedRef<unknown>) => {
      return (
        <Button
          ref={ref as ForwardedRef<HTMLButtonElement>}
          className={`flex h-full items-center gap-3 rounded-full !p-[0,_1rem] ${isActive ? "bg-gray-400 hover:bg-gray-400" : "bg-gray-200 hover:bg-gray-300"} ${props.className}`}
        >
          {props.children as React.ReactNode}
          <Icon
            icon={isActive ? "bxs:circle" : "bx:circle"}
            className="text-[10px]"
          />
        </Button>
      );
    },
  ),
);
