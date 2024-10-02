import { ReactNode } from "react";
type PillPropsType = { children: ReactNode };
export function Pill(props: PillPropsType) {
  return (
    <div className="px-3 py-1 flex items-center bg-gray-200 w-fit rounded-full gap-1 text-sm">
      {props.children}
    </div>
  );
}
