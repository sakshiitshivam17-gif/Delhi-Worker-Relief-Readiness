"use client";

import { useId, type ReactNode } from "react";
import { clamp, cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  tone?: "leaf" | "saffron";
  label: string;
  children?: ReactNode;
  className?: string;
}

const tones = {
  leaf: {
    stroke: "#7e22ce",
    strokeEnd: "#a855f7",
    track: "#f3e8ff",
  },
  saffron: {
    stroke: "#D97706",
    strokeEnd: "#F59E0B",
    track: "#FEF3C7",
  },
} as const;

export function ProgressRing({
  value,
  max,
  size = 152,
  strokeWidth = 13,
  tone = "leaf",
  label,
  children,
  className,
}: ProgressRingProps) {
  const gradientId = useId();
  const safeMax = max > 0 ? max : 1;
  const ratio = clamp(value / safeMax, 0, 1);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - ratio);
  const palette = tones[tone];

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.stroke} />
            <stop offset="100%" stopColor={palette.strokeEnd} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={palette.track}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        {children}
      </div>
    </div>
  );
}
