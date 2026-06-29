import React from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main
      className={cn(
        "w-full px-4 py-8 pt-20 lg:px-8 lg:py-10 lg:pt-8 min-h-screen",
        className
      )}
    >
      <div className="mx-auto max-w-[1400px]">
        {children}
      </div>
    </main>
  );
}
