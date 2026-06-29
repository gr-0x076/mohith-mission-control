import React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  label: string;
  value: number;
  max?: number;
  onChange: (val: number) => void;
  className?: string;
}

export function Slider({ label, value, max = 100, onChange, className }: SliderProps) {
  return (
    <label className={cn("block min-w-0", className)}>
      <span className="mb-1.5 flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span>{label}</span>
        <span className="text-purple-400">{value}</span>
      </span>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => {
          let val = Number(e.target.value);
          if (val > max) val = max;
          if (val < 0) val = 0;
          onChange(val);
        }}
        className="w-full accent-purple-500"
      />
    </label>
  );
}
