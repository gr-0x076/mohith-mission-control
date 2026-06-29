import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, label, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 text-slate-400 transition-all hover:border-purple-500/50 hover:bg-slate-800 hover:text-white hover:shadow-[0_0_10px_rgba(124,58,237,0.1)]",
          className
        )}
        {...props}
      >
        <Icon className="h-4 w-4" />
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
