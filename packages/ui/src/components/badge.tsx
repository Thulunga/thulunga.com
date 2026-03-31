import { cn } from "../utils/cn";
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "government" | "scholarship" | "job" | "remote";
}

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-earth-100 text-earth-700": variant === "default",
          "bg-blue-100 text-blue-700": variant === "government",
          "bg-amber-100 text-amber-700": variant === "scholarship",
          "bg-forest-100 text-forest-700": variant === "job",
          "bg-purple-100 text-purple-700": variant === "remote",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
