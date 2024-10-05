import React, { ForwardedRef, forwardRef } from "react";

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = forwardRef(
  (props: ButtonPropsType, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`rounded-full px-4 py-3 bg-gray-200 flex items-center gap-2  hover:bg-gray-300 ${props.className}`}
      >
        {props.children}
      </button>
    );
  },
);
