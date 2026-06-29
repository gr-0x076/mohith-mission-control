"use client";

import React from "react";
import { useMission } from "@/lib/store";
import { getDayNumber } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

export function StreakCalendar() {
  const { state } = useMission();
  
  // 40 days grid
  const days = Array.from({ length: 40 }, (_, i) => i + 1);
  
  return (
    <div>
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">40-Day Heatmap</h3>
      <div className="grid grid-cols-7 sm:grid-cols-10 gap-1.5 sm:gap-2">
        {days.map(dayNum => {
          // Find the date for this dayNum
          const start = new Date(state.missionStart + "T00:00:00");
          const currentDate = new Date(start.getTime() + (dayNum - 1) * 24 * 60 * 60 * 1000);
          
          const y = currentDate.getFullYear();
          const m = String(currentDate.getMonth() + 1).padStart(2, "0");
          const d = String(currentDate.getDate()).padStart(2, "0");
          const dateStr = `${y}-${m}-${d}`;

          const entry = state.dayEntries[dateStr];
          
          let intensity = 0; // 0 = not done/future, 1 = low, 2 = medium, 3 = high, 4 = very high
          let tooltip = `Day ${dayNum}`;

          if (entry) {
            const completedBlocks = entry.blocks.filter(b => b.complete).length;
            if (completedBlocks === 0 && entry.studyMinutes > 0) intensity = 1;
            else if (completedBlocks > 0 && completedBlocks <= 2) intensity = 2;
            else if (completedBlocks > 2 && completedBlocks <= 4) intensity = 3;
            else if (completedBlocks > 4) intensity = 4;
            
            tooltip = `Day ${dayNum}: ${completedBlocks} blocks completed`;
          }

          return (
            <div 
              key={dayNum}
              title={tooltip}
              className={cn(
                "w-full aspect-square rounded-sm transition-colors duration-300",
                intensity === 0 ? "bg-slate-800/50" 
                : intensity === 1 ? "bg-green-950/80"
                : intensity === 2 ? "bg-green-800"
                : intensity === 3 ? "bg-green-600"
                : "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
