"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // Progress value from 0 to 100
  size?: number; // Diameter of the circle
  strokeWidth?: number; // Thickness of the circle
  className?: string; // Additional classes
}

const CircularProgress = ({
  value = 0,
  size = 100,
  strokeWidth = 8,
  className,
  ...props
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        className="rotate-[-90deg]"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="text-main-600"
          stroke="currentColor"
          fill="transparent"
        />
        {/* Foreground Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="text-white"
          stroke="currentColor"
          strokeLinecap="round"
          fill="transparent"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.3s ease",
          }}
        />
      </svg>
      {/* Progress Text */}
      <span className="absolute text-center text-sm font-semibold text-white">
        {value}%
      </span>
    </div>
  );
};

export { CircularProgress };
