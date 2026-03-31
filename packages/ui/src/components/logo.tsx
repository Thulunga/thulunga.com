import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" };

  return (
    <span className={`font-heading font-bold ${sizes[size]} ${className ?? ""}`}>
      <span className="text-thulunga-500">Thu</span>
      <span className="text-forest-500">lunga</span>
    </span>
  );
}
