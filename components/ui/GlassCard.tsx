import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300",
          glow && "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";
