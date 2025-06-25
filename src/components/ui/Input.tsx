// 1. Input 매개인자 타입 선언

import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    // radio 타입일 경우 별도 처리
    if (type === "radio") {
      return (
        <input
          ref={ref}
          type="radio"
          className={clsx(
            "cursor-pointer appearance-none box-border w-4 h-4 border-2 border-gray-300 bg-white rounded-full checked:bg-green-600 checked:border-transparent",
            error && "border-red-500",
            className
          )}
          {...props}
        />
      );
    }

    if (type === "radio") {
      return (
        <input
          ref={ref}
          type="radio"
          className={clsx(
            "hidden cursor-pointer appearance-none box-border w-4 h-4 border-2 border-gray-300 bg-white rounded-full checked:bg-green-600 checked:border-transparent",
            error && "border-red-500",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <input
        //useHookForm 연결을 위한 ref 연결
        ref={ref}
        // className
        type={type}
        className={clsx(
          "w-full box-border bg-gray-50 border-2 border-dotted rounded-lg px-2 py-1 text-sm cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:bg-green-600 file:text-white hover:file:bg-green-700",
          error ? "border-red-500" : "border-gray-400",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
