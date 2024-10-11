import { ReactNode } from "react";
type PillPropsType = { children: ReactNode; className?: string };
export function Pill(props: PillPropsType) {
  return (
    <div
      className={
        "flex w-fit items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm font-medium " +
        props.className
      }
    >
      {props.children}
    </div>
  );
}
