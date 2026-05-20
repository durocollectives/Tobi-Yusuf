"use client";

import React, { type CSSProperties } from "react";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = "#c4957f",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "0px",
  background = "rgba(61, 31, 43, 1)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as CSSProperties
      }
      className={`shimmer-button${className ? ` ${className}` : ""}`}
      {...props}
    >
      <div className="shimmer-button-spark" aria-hidden />
      <div className="shimmer-button-backdrop" aria-hidden />
      <span className="shimmer-button-text">{children}</span>
    </button>
  );
}
