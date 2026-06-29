import React from "react";
import { cn } from "@/lib/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={cn("block min-w-0", className)}>
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <input
          ref={ref}
          className="w-full rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
          {...props}
        />
      </label>
    );
  }
);
TextInput.displayName = "TextInput";
