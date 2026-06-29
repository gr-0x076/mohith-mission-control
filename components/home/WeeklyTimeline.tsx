"use client";

import React from "react";
import { useMission } from "@/lib/store";
import { getDayNumber } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

const WEEKS = [
  "Foundation",
  "Linear Algebra",
  "Graphs",
  "Optimization",
  "Advanced ML",
  "Capstone"
];

export function WeeklyTimeline() {
  const { state } = useMission();
  const currentDayNum = getDayNumber(state.missionStart, state.currentDay);
  
  // Assuming 40 days = approx 6 weeks (7 days each)
  const currentWeek = Math.floor((currentDayNum - 1) / 7);

  return (
    <div className="mt-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-1">
        Roadmap
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {WEEKS.map((title, i) => {
          const isPast = i < currentWeek;
          const isCurrent = i === currentWeek;
          
          // Calculate progress for current week based on day in week (0-6)
          const daysInWeek = 7;
          const currentDayOfWeek = (currentDayNum - 1) % 7;
          const progress = isPast ? 100 : (isCurrent ? ((currentDayOfWeek + 1) / daysInWeek) * 100 : 0);

          return (
            <div 
              key={i}
              className={cn(
                "snap-start shrink-0 w-[200px] p-4 rounded-xl border transition-all duration-300",
                isCurrent ? "border-purple-500/50 bg-purple-500/10 shadow-[0_0_20px_rgba(124,58,237,0.15)]" 
                : isPast ? "border-slate-700/50 bg-slate-800/40" 
                : "border-slate-800/30 bg-slate-900/30 opacity-50"
              )}
            >
              <div className="text-xs font-mono font-bold text-slate-400 mb-1">Week {i + 1}</div>
              <div className="text-sm font-semibold text-slate-200 mb-4">{title}</div>
              
              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out",
                    isCurrent ? "bg-purple-500 shadow-[0_0_8px_rgba(124,58,237,0.8)]" : "bg-slate-500"
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
