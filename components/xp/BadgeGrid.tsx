"use client";

import React from "react";
import { useMission } from "@/lib/store";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

export function BadgeGrid() {
  const { state } = useMission();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {state.badges.map((badge) => {
        const unlocked = badge.unlocked;

        return (
          <GlassCard 
            key={badge.id}
            glow={unlocked}
            className={cn(
              "flex flex-col items-center text-center p-6 transition-all duration-500",
              unlocked ? "bg-slate-800/80 border-yellow-500/30" : "bg-slate-900/30 border-slate-800 opacity-60"
            )}
          >
            <div className={cn(
              "text-4xl mb-4 transition-transform duration-500",
              unlocked ? "scale-110 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" : "grayscale opacity-50"
            )}>
              {badge.icon}
            </div>
            
            <h3 className={cn(
              "text-sm font-bold tracking-tight mb-2",
              unlocked ? "text-slate-100" : "text-slate-500"
            )}>
              {badge.name}
            </h3>
            
            {unlocked ? (
              <p className="text-xs text-slate-400">Unlocked</p>
            ) : (
              <div className="flex items-center gap-1.5 mt-auto">
                <Lock className="h-3 w-3 text-slate-600" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600">Locked</span>
              </div>
            )}
            
            {!unlocked && (
              <div className="absolute inset-0 bg-slate-950/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-4 backdrop-blur-sm rounded-xl">
                <p className="text-xs font-semibold text-slate-300">
                  {badge.description}
                </p>
              </div>
            )}
          </GlassCard>
        );
      })}
    </div>
  );
}
