"use client";

import React, { useEffect, useState } from "react";
import { useMission } from "@/lib/store";
import { useCurrentTime, getGreeting, getDayNumber, getDaysRemaining, formatCountdown } from "@/lib/date-utils";

export function HeroGreeting() {
  const { state } = useMission();
  const time = useCurrentTime();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const greeting = getGreeting(time);
  const dayNumber = getDayNumber(state.missionStart, state.currentDay);
  const daysRemaining = getDaysRemaining(state.currentDay, state.missionEnd);

  // Time formatter
  const formatTime = (d: Date) => {
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  if (!mounted) {
    return <div className="min-h-[140px]" />; // Placeholder to avoid hydration mismatch
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between animate-slide-up">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
          {greeting}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Mohith 👋</span>
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-400">
          <div className="text-lg font-medium text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full w-fit">
            Day {Math.max(0, dayNumber)} of {getDaysRemaining(state.missionStart, state.missionEnd) + Math.max(1, dayNumber)}
          </div>
          <p className="text-sm font-semibold tracking-wide uppercase">Every day compounds.</p>
        </div>
      </div>
      
      <div className="flex flex-row md:flex-col gap-4 md:gap-2 items-center md:items-end">
        <div className="flex flex-col items-end">
          <div className="text-xl md:text-2xl font-bold text-slate-200 font-mono">
            {formatTime(time)}
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
            {formatDate(time)}
          </div>
        </div>
        <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-lg text-sm font-bold text-slate-300 font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          {formatCountdown(daysRemaining)}
        </div>
      </div>
    </div>
  );
}
