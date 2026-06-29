"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function MissionComplete() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-green-950/80 backdrop-blur-sm animate-fade-in pointer-events-none">
      <div className="relative">
        {/* Glow behind text */}
        <div className="absolute inset-0 blur-3xl bg-green-500/30 rounded-full scale-150 animate-pulse" />
        
        <h2 
          className="relative text-4xl sm:text-6xl font-bold tracking-wider text-green-400 text-glow-green"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Mission Complete.
        </h2>
      </div>
    </div>
  );
}
