"use client";

import React, { type CSSProperties } from "react";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientMid?: string;
  duration?: string;
}

export function AnimatedGradientText({
  children,
  className,
  gradientFrom = "var(--signature)",
  gradientMid = "var(--soft-dark, #c4957f)",
  gradientTo = "var(--signature)",
  duration = "4s",
}: AnimatedGradientTextProps) {
  return (
    <span
      className={`animated-gradient-text${className ? ` ${className}` : ""}`}
      style={
        {
          "--gradient-from": gradientFrom,
          "--gradient-mid": gradientMid,
          "--gradient-to": gradientTo,
          "--gradient-duration": duration,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
