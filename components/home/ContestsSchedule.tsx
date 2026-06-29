"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, Anchor, Activity, Clock, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMission } from "@/lib/store";

type ContestDef = { name: string; platform: string; time?: string; detail?: string; durationStr?: string; duration: number };

const FIXED_SCHEDULE: Record<number, ContestDef[]> = {
  0: [{ name: "LeetCode Weekly", platform: "LeetCode", time: "08:00 AM - 09:30 AM", duration: 90 }],
  1: [{ name: "CodeChef Monday Munch", platform: "CodeChef", time: "12:00 PM - 03:00 PM", duration: 180 }],
  2: [],
  3: [{ name: "CodeChef Starters", platform: "CodeChef", time: "08:00 PM - 10:00 PM", duration: 120 }],
  4: [],
  5: [],
  6: [
    { name: "AtCoder Beginner", platform: "AtCoder", time: "05:30 PM - 07:10 PM", duration: 100 },
    { name: "LeetCode Biweekly", platform: "LeetCode", time: "07:30 PM - 09:00 PM", duration: 90 },
  ]
};

const DYNAMIC_CONTESTS: ContestDef[] = [
  { name: "Codeforces Round", detail: "Div 1-4 Rounds", durationStr: "2 - 2.25 hours", duration: 120, platform: "Codeforces" },
  { name: "HackerRank Challenge", detail: "Weekly / Hiring", durationStr: "Flexible", duration: 120, platform: "HackerRank" },
  { name: "Kaggle Competition", detail: "Project Session", durationStr: "1-2 hours", duration: 120, platform: "Kaggle" },
  { name: "AtCoder ARC / AGC", detail: "Regular / Grand", durationStr: "120 - 180 mins", duration: 120, platform: "AtCoder" }
];

export function ContestsSchedule() {
  const { state, dispatch } = useMission();
  const todayEntry = state.dayEntries[state.currentDay];
  if (!todayEntry) return null;

  const today = new Date(state.currentDay);
  const dayOfWeek = today.getDay();
  const todaysFixed = FIXED_SCHEDULE[dayOfWeek] || [];

  const toggleContest = (contest: ContestDef) => {
    const existing = todayEntry.blocks.find(b => b.title === contest.name);
    let newBlocks = [...todayEntry.blocks];
    if (existing) {
      newBlocks = newBlocks.filter(b => b.id !== existing.id);
    } else {
      newBlocks.push({ 
        id: `c-${Date.now()}`, 
        title: contest.name, 
        minutes: contest.duration, 
        complete: true, // Auto complete when added from here
        category: "Other" 
      });
    }
    dispatch({ type: "UPDATE_DAY_ENTRY", payload: { date: state.currentDay, entry: { blocks: newBlocks } } });
  };

  const isAttended = (name: string) => todayEntry.blocks.some(b => b.title === name);

  const getPlatformStyle = (platform: string) => {
    switch(platform) {
      case "CodeChef": return "bg-amber-900/30 text-amber-500 border-amber-500/30";
      case "LeetCode": return "bg-orange-900/30 text-orange-400 border-orange-500/30";
      case "AtCoder": return "bg-zinc-900/50 text-zinc-300 border-zinc-500/30";
      case "Codeforces": return "bg-blue-900/30 text-blue-400 border-blue-500/30";
      case "HackerRank": return "bg-green-900/30 text-green-400 border-green-500/30";
      case "Kaggle": return "bg-cyan-900/30 text-cyan-400 border-cyan-500/30";
      default: return "bg-slate-800 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="relative rounded-xl border border-slate-700 bg-slate-900/60 overflow-hidden backdrop-blur-md animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />

      <div className="relative p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono tracking-tight text-slate-100 uppercase">Contests & Arenas</h2>
            <div className="text-xs font-semibold text-slate-500 tracking-widest uppercase">Live Attendance Tracker</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Fixed Contests for Today */}
          <GlassCard className="border-indigo-500/20 bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <Anchor className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Today's Fixed Schedule</h3>
            </div>
            
            {todaysFixed.length === 0 ? (
              <div className="text-sm font-mono text-slate-500 py-4 text-center">No fixed contests scheduled for today.</div>
            ) : (
              <div className="space-y-3">
                {todaysFixed.map((c, i) => {
                  const attended = isAttended(c.name);
                  return (
                    <button 
                      key={i} 
                      onClick={() => toggleContest(c)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all duration-300 group",
                        attended ? "border-green-500/40 bg-green-500/10" : "border-slate-800 bg-slate-800/50 hover:border-slate-600"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                          attended ? "border-green-500 bg-green-500/20 text-green-400" : "border-slate-600 bg-slate-900 text-transparent group-hover:border-slate-400"
                        )}>
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className={cn("text-sm font-bold", attended ? "text-green-300" : "text-slate-200")}>{c.name}</span>
                          <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                            <Clock className="h-3 w-3" /> {c.time}
                          </span>
                        </div>
                      </div>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider", getPlatformStyle(c.platform))}>
                        {c.platform}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </GlassCard>

          {/* Dynamic Contests */}
          <GlassCard className="border-emerald-500/20 bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <Activity className="h-4 w-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Dynamic Flex</h3>
            </div>
            <div className="space-y-3">
              {DYNAMIC_CONTESTS.map((c, i) => {
                const attended = isAttended(c.name);
                return (
                  <button 
                    key={i} 
                    onClick={() => toggleContest(c)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all duration-300 group",
                      attended ? "border-green-500/40 bg-green-500/10" : "border-slate-800 bg-slate-800/50 hover:border-slate-600"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                        attended ? "border-green-500 bg-green-500/20 text-green-400" : "border-slate-600 bg-slate-900 text-transparent group-hover:border-slate-400"
                      )}>
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={cn("text-sm font-bold", attended ? "text-green-300" : "text-slate-200")}>{c.name}</span>
                        <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                          <Zap className="h-3 w-3 text-emerald-500/70" /> {c.detail} ({c.durationStr})
                        </span>
                      </div>
                    </div>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider", getPlatformStyle(c.platform))}>
                      {c.platform}
                    </span>
                  </button>
                );
              })}
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
