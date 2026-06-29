import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  label: string;
  value: number;
  step?: number;
  onChange: (val: number) => void;
  className?: string;
}

export function Stepper({ label, value, step = 1, onChange, className }: StepperProps) {
  return (
    <div className={cn("", className)}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <div className="flex rounded-lg border border-slate-700 bg-slate-950/50">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - step))}
          className="flex h-9 w-9 items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          -
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="min-w-0 flex-1 bg-transparent px-2 text-center text-sm font-medium outline-none text-slate-200 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => onChange(value + step)}
          className="flex h-9 w-9 items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
