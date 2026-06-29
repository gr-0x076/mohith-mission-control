"use client";

import React from "react";
import { useMission } from "@/lib/store";
import { XP_LEVEL_THRESHOLDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LevelBar() {
  const { state } = useMission();
  const xp = state.xp;
  
  const currentThreshold = XP_LEVEL_THRESHOLDS[xp.level - 1] || 0;
  const nextThreshold = XP_LEVEL_THRESHOLDS[xp.level] || xp.totalXP;
  
  const progressToNext = nextThreshold > currentThreshold 
    ? ((xp.totalXP - currentThreshold) / (nextThreshold - currentThreshold)) * 100 
    : 100;

  return (
    <div className="bg-slate-900/60 border border-slate-700/50 p-8 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2 font-mono">
            Level {xp.level}
          </h2>
          <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 uppercase tracking-widest">
            {xp.levelTitle}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="flex justify-between items-end mb-3">
            <span className="text-sm font-semibold text-slate-400">Progress to Lvl {xp.level + 1}</span>
            <span className="text-sm font-mono font-bold text-yellow-500">
              {xp.totalXP} / {nextThreshold} XP
            </span>
          </div>
          
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all duration-1000"
              style={{ width: `${progressToNext}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
