import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title: string;
  body: string;
  icon?: LucideIcon;
  compact?: boolean;
  className?: string;
}

export function EmptyState({ title, body, icon: Icon, compact = false, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/30 text-center",
        compact ? "p-6" : "p-10",
        className
      )}
    >
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/50 text-slate-400">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h3 className="mb-1.5 text-base font-semibold text-slate-200">{title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-slate-400">{body}</p>
    </div>
  );
}
