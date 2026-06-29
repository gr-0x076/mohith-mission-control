import React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  className?: string;
}

export function Toggle({ label, checked, onChange, className }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all duration-300",
        checked
          ? "border-green-500/40 bg-green-500/10 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
          : "border-slate-700 bg-slate-900/50 text-slate-400 hover:border-purple-500/50 hover:text-slate-200",
        className
      )}
    >
      {label}
    </button>
  );
}
