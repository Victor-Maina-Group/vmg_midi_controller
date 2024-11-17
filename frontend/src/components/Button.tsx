import React, { ForwardedRef, forwardRef } from "react";

type ButtonPropsType = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = forwardRef(
  (props: ButtonPropsType, ref: ForwardedRef<HTMLButtonElement>) => {
    return (
      <button
        ref={ref}
        {...props}
        className={`flex items-center gap-2 rounded-full bg-gray-200 px-4 py-3 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 ${props.className}`}
      >
        {props.children}
      </button>
    );
  },
);
