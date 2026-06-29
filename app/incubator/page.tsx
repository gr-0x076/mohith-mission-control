"use client";

import React, { useState } from "react";
import { useMission } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ListTodo } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Slider } from "@/components/ui/Slider";
import { PageShell } from "@/components/layout/PageShell";
import { Beaker } from "lucide-react";

export default function IncubatorPage() {
  const { state, dispatch } = useMission();
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const toggleTask = (phaseId: string, taskId: string) => {
    const newPhases = state.incubatorPhases.map(p => {
      if (p.id !== phaseId) return p;
      const newTasks = p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      const completedCount = newTasks.filter(t => t.completed).length;
      const completionPercent = Math.round((completedCount / newTasks.length) * 100);
      return { ...p, tasks: newTasks, completionPercent };
    });
    dispatch({ type: "UPDATE_STATE", payload: { incubatorPhases: newPhases } });
  };

  const updatePhase = (phaseId: string, percent: number) => {
    const newPhases = state.incubatorPhases.map(p => p.id === phaseId ? { ...p, completionPercent: percent } : p);
    dispatch({ type: "UPDATE_STATE", payload: { incubatorPhases: newPhases } });
  }

  return (
    <PageShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20 border border-pink-500/30">
          <Beaker className="h-6 w-6 text-pink-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">IntentRec Incubator</h1>
          <p className="text-sm text-slate-400 font-medium">Production recommendation system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
        {state.incubatorPhases.map((phase) => {
          const isComplete = phase.completionPercent >= 100;
          const inProgress = phase.completionPercent > 0 && !isComplete;
          const isExpanded = expandedPhase === phase.id;

          return (
            <div key={phase.id}>
              <GlassCard
                glow={isComplete || inProgress}
                className={cn(
                  "flex flex-col gap-4 cursor-pointer transition-all duration-300",
                  isComplete ? "border-green-500/40 bg-slate-900/80 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                  : inProgress ? "border-pink-500/40 bg-slate-900/80 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                  : "border-slate-700/50 bg-slate-900/60"
                )}
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-bold text-slate-200 tracking-tight">{phase.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-slate-400">{phase.completionPercent}%</span>
                    <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform", isExpanded && "rotate-180")} />
                  </div>
                </div>

                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      isComplete ? "bg-green-500" : "bg-pink-500"
                    )}
                    style={{ width: `${phase.completionPercent}%` }}
                  />
                </div>
              </GlassCard>

              {isExpanded && (
                <div className="mt-3 ml-4 space-y-4 animate-slide-up">
                  <GlassCard>
                    <div className="flex items-center gap-2 mb-4">
                      <ListTodo className="h-4 w-4 text-pink-400" />
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Subtasks</h4>
                    </div>
                    <div className="space-y-2 mb-6">
                      {phase.tasks.map(task => (
                        <button
                          key={task.id}
                          onClick={(e) => { e.stopPropagation(); toggleTask(phase.id, task.id); }}
                          className={cn(
                            "flex items-center gap-3 w-full px-3 py-2 rounded-lg border text-left text-sm font-medium transition-all",
                            task.completed
                              ? "border-green-500/30 bg-green-500/5 text-green-300"
                              : "border-slate-800 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                          )}
                        >
                          <div className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                            task.completed ? "border-green-500 bg-green-500/20 text-green-400" : "border-slate-600 bg-slate-900 text-transparent"
                          )}>
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </div>
                          {task.name}
                        </button>
                      ))}
                    </div>
                    
                    <Slider 
                      label="Override Completion %" 
                      value={phase.completionPercent} 
                      onChange={(val) => updatePhase(phase.id, val)} 
                    />
                  </GlassCard>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
