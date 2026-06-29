"use client";

import React from "react";
import { useMission } from "@/lib/store";
import { cn } from "@/lib/utils";
import { GraduationCap, Check, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Slider } from "@/components/ui/Slider";
import { PageShell } from "@/components/layout/PageShell";

export default function MLFPage() {
  const { state, dispatch } = useMission();

  const updateWeek = (weekId: string, updates: Partial<import("@/lib/types").MLFWeek>) => {
    const newWeeks = state.mlfWeeks.map(w => w.id === weekId ? { ...w, ...updates } : w);
    dispatch({ type: "UPDATE_STATE", payload: { mlfWeeks: newWeeks } });
  };

  return (
    <PageShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/30">
          <GraduationCap className="h-6 w-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">ML Foundations (IITM)</h1>
          <p className="text-sm text-slate-400 font-medium">12-week course — concepts over interview prep</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up">
        {state.mlfWeeks.map((week) => {
          const isDone = week.lectureProgress >= 100 && week.notesCompleted && week.implementationDone && week.revisionDone;
          const inProgress = week.lectureProgress > 0;

          return (
            <GlassCard
              key={week.id}
              glow={isDone || inProgress}
              className={cn(
                "flex flex-col gap-4 transition-all duration-300",
                isDone ? "border-green-500/30" : inProgress ? "border-indigo-500/30" : ""
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-500 mb-1">Week {week.weekNumber}</div>
                  <h3 className="text-base font-bold text-slate-200 tracking-tight">{week.title}</h3>
                </div>
                {isDone && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Subtopics */}
              {week.subtopics.length > 1 && (
                <div className="flex flex-wrap gap-1.5">
                  {week.subtopics.map(s => (
                    <span key={s.id} className="text-[11px] font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded">
                      {s.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Lecture Progress */}
              <Slider label="Lecture Progress" value={week.lectureProgress} onChange={(val) => updateWeek(week.id, { lectureProgress: val })} />

              {/* Toggle checkboxes */}
              <div className="grid grid-cols-3 gap-2">
                {([
                  { key: "notesCompleted" as const, label: "Notes" },
                  { key: "implementationDone" as const, label: "Impl" },
                  { key: "revisionDone" as const, label: "Revision" },
                ]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => updateWeek(week.id, { [key]: !week[key] })}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-xs font-semibold transition-all",
                      week[key]
                        ? "border-green-500/40 bg-green-500/10 text-green-400"
                        : "border-slate-700 bg-slate-900/50 text-slate-500 hover:text-slate-300"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Confidence */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Confidence</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => updateWeek(week.id, { confidence: star })}
                      className={`transition-colors ${star <= week.confidence ? "text-amber-400" : "text-slate-700 hover:text-slate-500"}`}
                    >
                      <Star className="h-4 w-4" fill={star <= week.confidence ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageShell>
  );
}
