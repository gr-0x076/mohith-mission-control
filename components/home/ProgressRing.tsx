"use client";

import React, { useEffect, useState } from "react";
import { useMission } from "@/lib/store";
import { getDayNumber, getDaysRemaining } from "@/lib/date-utils";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProgressRing() {
  const { state } = useMission();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalDays = getDaysRemaining(state.missionStart, state.missionEnd) + getDayNumber(state.missionStart, state.currentDay);
  const currentDayNum = getDayNumber(state.missionStart, state.currentDay);
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentDayNum / totalDays) * 100))) || 0;

  // 6-track milestone calculations
  const pdsaAvg = state.pdsaModules.reduce((a, m) => a + m.completionPercent, 0) / (state.pdsaModules.length || 1);
  const pdsaDone = pdsaAvg >= 50;

  const mlfDone = state.mlfWeeks.filter(w => w.lectureProgress >= 100).length >= 6;

  const mlItems = state.mlJourney.reduce((a, s) => a + s.items.length, 0);
  const mlDoneCount = state.mlJourney.reduce((a, s) => a + s.items.filter(i => i.implemented).length, 0);
  const mlDone = mlItems > 0 && (mlDoneCount / mlItems) >= 0.5;

  const incDone = state.incubatorPhases.filter(p => p.completionPercent >= 100).length >= 4;

  const dbmsDone = state.dbmsModules.filter(m => m.lectureDone && m.revisionDone).length >= 7;

  const madDone = state.madModules.filter(m => m.lectureDone && m.assignmentDone).length >= 6;

  const milestones = [
    { label: "PDSA", done: pdsaDone },
    { label: "MLF (IITM)", done: mlfDone },
    { label: "ML Journey", done: mlDone },
    { label: "Incubator", done: incDone },
    { label: "DBMS", done: dbmsDone },
    { label: "MAD I", done: madDone },
  ];

  const size = 400;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = center - strokeWidth * 2 - 30;
  const circumference = 2 * Math.PI * radius;

  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        setOffset(circumference - (progressPercent / 100) * circumference);
      }, 300);
    }
  }, [progressPercent, circumference, mounted]);

  if (!mounted) return <div className="h-[400px] w-full" />;

  return (
    <div className="relative w-full flex justify-center py-10 animate-fade-in">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" width={size} height={size}>
          <circle cx={center} cy={center} r={radius} fill="transparent" stroke="rgba(30, 41, 59, 0.5)" strokeWidth={strokeWidth} />
          <circle
            cx={center} cy={center} r={radius} fill="transparent"
            stroke="url(#gradient)" strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" className="transition-all duration-1500 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Mission Progress</span>
          <span className="text-6xl font-bold text-white mb-1 font-mono text-glow">{progressPercent}%</span>
          <span className="text-sm font-semibold text-purple-400">
            {currentDayNum > 0 ? `Day ${currentDayNum} / ${totalDays}` : `Starts in ${Math.abs(currentDayNum - 1)} Days`}
          </span>
        </div>

        {milestones.map((ms, i) => {
          const angle = -Math.PI / 2 + (i * (2 * Math.PI)) / milestones.length;
          const x = center + (radius + 45) * Math.cos(angle);
          const y = center + (radius + 45) * Math.sin(angle);

          return (
            <div
              key={ms.label}
              className={cn(
                "absolute flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
                ms.done ? "opacity-100" : "opacity-40 grayscale"
              )}
              style={{ left: x, top: y }}
            >
              <div className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                ms.done ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-slate-800 border border-slate-700 text-slate-500"
              )}>
                <Check className="h-3 w-3" strokeWidth={3} />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider whitespace-nowrap",
                ms.done ? "text-slate-200" : "text-slate-500"
              )}>
                {ms.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
