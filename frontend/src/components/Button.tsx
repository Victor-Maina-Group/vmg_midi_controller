import React from "react";

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>;
export function Button(props: ButtonPropsType) {
  return (
    <button
      {...props}
      className={`rounded-full px-4 py-3 bg-gray-200 flex items-center gap-2  transition-colors hover:bg-gray-300 ${props.className}`}
    >
      {props.children}
    </button>
  );
}
