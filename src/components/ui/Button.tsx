import clsx from "clsx";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "image" | "default";
  src?: string;
  alt?: string;
  size?: number;

  onClick?: () => void;
};

function Button({
  className,
  children,
  disabled,
  onClick,
  src,
  alt,
  size = 20,
  variant = "default",
  ...props
}: ButtonProps) {
  if (variant === "image")
    return (
      <div onClick={onClick} className="inline-block cursor-pointer">
        <Image
          width={size}
          height={size}
          // 무조건 src가 null 값이 아니라는 것을 선언
          src={src!}
          alt={alt || "button image"}
        />
      </div>
    );

  return (
    <button
      disabled={disabled}
      className={clsx(
        "bg-orange-600 text-white text-md font-bold rounded-2xl py-2 hover:bg-orange-700 focus:bg-orange-800 transition cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className // 마지막에 넣기! 사용자 지정 className이 우선순위 갖게 됨
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
