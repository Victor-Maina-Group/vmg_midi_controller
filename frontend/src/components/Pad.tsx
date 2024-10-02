import { Button } from "./Button";

type PadPropsType = {
  mode?: "trigger" | "toggle";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Pad({ mode = "trigger", ...props }: PadPropsType) {
  return (
    <Button
      className={`flex-1 rounded-2xl relative !p-1 active:bg-gray-400 transition-[50ms] ${props.className}`}
    >
      <div className="absolute inset-1 p-4 border-[2px] border-white rounded-xl z-0"></div>
      {props.children}
    </Button>
  );
}
