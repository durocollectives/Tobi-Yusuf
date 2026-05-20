"use client";

import React, { type CSSProperties } from "react";

interface BorderBeamProps {
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
  size?: number;
  borderWidth?: number;
  className?: string;
}

export function BorderBeam({
  colorFrom = "var(--signature)",
  colorTo = "var(--soft, #f5ebe3)",
  duration = 20,
  size = 180,
  borderWidth = 1,
  className,
}: BorderBeamProps) {
  return (
    <div
      className={`border-beam-wrapper${className ? ` ${className}` : ""}`}
      aria-hidden
      style={
        {
          "--beam-color-from": colorFrom,
          "--beam-color-to": colorTo,
          "--beam-duration": `${duration}s`,
          "--beam-size": `${size}px`,
          "--beam-border-width": `${borderWidth}px`,
        } as CSSProperties
      }
    />
  );
}
