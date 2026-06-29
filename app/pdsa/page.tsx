"use client";

import React, { useState } from "react";
import { useMission } from "@/lib/store";
import { PDSAModule } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown, Star, FileText, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Slider } from "@/components/ui/Slider";
import { Stepper } from "@/components/ui/Stepper";
import { PageShell } from "@/components/layout/PageShell";
import { Brain } from "lucide-react";

export default function PDSAPage() {
  const { state, dispatch } = useMission();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateModule = (moduleId: string, updates: Partial<PDSAModule>) => {
    const newModules = state.pdsaModules.map(m => m.id === moduleId ? { ...m, ...updates } : m);
    dispatch({ type: "UPDATE_STATE", payload: { pdsaModules: newModules } });
  };

  const toggleSubtopic = (moduleId: string, subtopicId: string) => {
    const mod = state.pdsaModules.find(m => m.id === moduleId);
    if (!mod) return;
    const newSubs = mod.subtopics.map(s => s.id === subtopicId ? { ...s, completed: !s.completed } : s);
    const completedCount = newSubs.filter(s => s.completed).length;
    const completionPercent = Math.round((completedCount / newSubs.length) * 100);
    const newModules = state.pdsaModules.map(m =>
      m.id === moduleId ? { ...m, subtopics: newSubs, completionPercent } : m
    );
    dispatch({ type: "UPDATE_STATE", payload: { pdsaModules: newModules } });
  };

  return (
    <PageShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30">
          <Brain className="h-6 w-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">PDSA</h1>
          <p className="text-sm text-slate-400 font-medium">Programming, Data Structures & Algorithms</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 animate-slide-up">
        {state.pdsaModules.map((mod) => {
          const isExpanded = expandedId === mod.id;
          const isComplete = mod.completionPercent >= 100;
          const inProgress = mod.completionPercent > 0 && !isComplete;

          return (
            <div key={mod.id}>
              <div
                className={cn(
                  "rounded-xl border p-4 transition-all duration-300 backdrop-blur-md cursor-pointer group",
                  isComplete ? "border-green-500/40 bg-slate-900/80 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                    : inProgress ? "border-purple-500/40 bg-slate-900/80 shadow-[0_0_20px_rgba(124,58,237,0.1)]"
                    : "border-slate-700/50 bg-slate-900/60 hover:border-slate-600"
                )}
                onClick={() => setExpandedId(isExpanded ? null : mod.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold font-mono",
                      isComplete ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-slate-800 text-slate-400 border border-slate-700"
                    )}>
                      {isComplete ? <Check className="h-4 w-4" /> : mod.id.split("-")[1]}
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-slate-200">{mod.name}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono font-bold text-slate-400">{mod.completionPercent}%</span>
                    <span className="text-xs font-mono text-slate-500">{mod.leetcodeProblems + mod.codeforcesProblems} solved</span>
                    <ChevronDown className={cn("h-5 w-5 text-slate-500 transition-transform duration-300", isExpanded && "rotate-180")} />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-3">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      isComplete ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-purple-500 shadow-[0_0_8px_rgba(124,58,237,0.5)]"
                    )}
                    style={{ width: `${mod.completionPercent}%` }}
                  />
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="mt-3 ml-4 space-y-4 animate-slide-up">
                  {/* Subtopics checklist */}
                  <GlassCard>
                    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Subtopics</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.subtopics.map(sub => (
                        <button
                          key={sub.id}
                          onClick={(e) => { e.stopPropagation(); toggleSubtopic(mod.id, sub.id); }}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg border text-left text-sm font-medium transition-all",
                            sub.completed
                              ? "border-green-500/30 bg-green-500/5 text-green-300"
                              : "border-slate-800 bg-slate-800/30 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                          )}
                        >
                          <div className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                            sub.completed ? "border-green-500 bg-green-500/20 text-green-400" : "border-slate-600 bg-slate-900 text-transparent"
                          )}>
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </div>
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </GlassCard>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Problems & Revision */}
                    <GlassCard>
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Tracking</h4>
                      <div className="space-y-4">
                        <Stepper label="LeetCode" value={mod.leetcodeProblems} onChange={(val) => updateModule(mod.id, { leetcodeProblems: val })} />
                        <Stepper label="Codeforces" value={mod.codeforcesProblems} onChange={(val) => updateModule(mod.id, { codeforcesProblems: val })} />
                        <Stepper label="Revision Count" value={mod.revisionCount} onChange={(val) => updateModule(mod.id, { revisionCount: val })} />
                      </div>
                    </GlassCard>

                    {/* Confidence */}
                    <GlassCard>
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Confidence</h4>
                      <div className="flex gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={(e) => { e.stopPropagation(); updateModule(mod.id, { confidence: star }); }}
                            className={`transition-colors ${star <= mod.confidence ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" : "text-slate-700 hover:text-slate-500"}`}
                          >
                            <Star className="h-7 w-7" fill={star <= mod.confidence ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>
                    </GlassCard>
                  </div>

                  {/* Notes */}
                  <GlassCard>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Notes</h4>
                    </div>
                    <textarea
                      value={mod.notes}
                      onChange={(e) => updateModule(mod.id, { notes: e.target.value })}
                      placeholder="Jot down important patterns or gotchas..."
                      className="w-full min-h-[80px] bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all resize-y"
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
