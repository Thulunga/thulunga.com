import { cn } from "../utils/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-thulunga-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-thulunga-500 text-white hover:bg-thulunga-600": variant === "primary",
          "bg-forest-500 text-white hover:bg-forest-600": variant === "secondary",
          "border border-earth-300 text-earth-700 hover:bg-earth-50": variant === "outline",
          "text-earth-600 hover:bg-earth-50": variant === "ghost",
        },
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
