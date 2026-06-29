"use client";

import React from "react";
import { useMission } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Code2, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Slider } from "@/components/ui/Slider";
import { PageShell } from "@/components/layout/PageShell";

export default function MADPage() {
  const { state, dispatch } = useMission();

  const updateModule = (moduleId: string, updates: Partial<import("@/lib/types").MADModule>) => {
    const newModules = state.madModules.map(m => m.id === moduleId ? { ...m, ...updates } : m);
    dispatch({ type: "UPDATE_STATE", payload: { madModules: newModules } });
  };

  return (
    <PageShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/30">
          <Code2 className="h-6 w-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Modern App Dev I</h1>
          <p className="text-sm text-slate-400 font-medium">IIT Madras Curriculum</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-slide-up">
        {state.madModules.map((mod, index) => {
          const isDone = mod.lectureDone && mod.assignmentDone && mod.projectProgress >= 100;
          const inProgress = mod.lectureDone || mod.assignmentDone || mod.projectProgress > 0;

          return (
            <GlassCard
              key={mod.id}
              glow={isDone || inProgress}
              className={cn(
                "flex flex-col gap-4 transition-all duration-300",
                isDone ? "border-green-500/30" : inProgress ? "border-cyan-500/30" : ""
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-500 mb-1">Module {index + 1}</div>
                  <h3 className="text-sm font-bold text-slate-200 tracking-tight">{mod.name}</h3>
                </div>
                {isDone && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400 border border-green-500/30 shrink-0">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Project Progress */}
              <Slider 
                label="Project Progress" 
                value={mod.projectProgress} 
                onChange={(val) => updateModule(mod.id, { projectProgress: val })} 
              />

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-slate-800">
                {[
                  { key: "lectureDone" as const, label: "Lecture" },
                  { key: "assignmentDone" as const, label: "Assignment" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => updateModule(mod.id, { [key]: !mod[key] })}
                    className={cn(
                      "flex items-center justify-center gap-2 px-2 py-2 rounded-lg border text-xs font-medium transition-all",
                      mod[key]
                        ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                        : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </PageShell>
  );
}
