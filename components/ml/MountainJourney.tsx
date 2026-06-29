"use client";

import React, { useState } from "react";
import { useMission } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Check, Mountain, BookOpen, Code2, PenTool, LayoutDashboard } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function MountainJourney() {
  const { state, dispatch } = useMission();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleItemProperty = (sectionId: string, itemId: string, property: keyof import("@/lib/types").MLJourneyItem) => {
    const newJourney = state.mlJourney.map(s => {
      if (s.id !== sectionId) return s;
      const newItems = s.items.map(i => i.id === itemId ? { ...i, [property]: !i[property] } : i);
      return { ...s, items: newItems };
    });
    dispatch({ type: "UPDATE_STATE", payload: { mlJourney: newJourney } });
  };

  return (
    <div className="relative max-w-4xl mx-auto py-12 animate-fade-in flex flex-col items-center">
      
      <div className="relative mb-12 z-10 flex items-center gap-3 bg-slate-900/80 border border-slate-700 px-6 py-3 rounded-full backdrop-blur-md shadow-xl">
        <Mountain className="h-5 w-5 text-indigo-400" />
        <span className="font-bold text-slate-200 tracking-widest uppercase text-sm">
          The ML Journey
        </span>
      </div>

      <div className="w-full flex flex-col gap-6">
        {state.mlJourney.map((section, idx) => {
          const totalItems = section.items.length;
          const completedItems = section.items.filter(i => i.implemented).length;
          const isComplete = completedItems === totalItems && totalItems > 0;
          const inProgress = completedItems > 0 && !isComplete;
          const isExpanded = expandedSection === section.id;

          return (
            <div key={section.id} className="relative w-full">
              <GlassCard 
                glow={isComplete || inProgress}
                className={cn(
                  "p-4 cursor-pointer transition-all duration-300 relative overflow-hidden group",
                  isComplete ? "bg-indigo-900/20 border-indigo-500/40" 
                  : inProgress ? "bg-slate-800/80 border-indigo-400/60 shadow-[0_0_20px_rgba(99,102,241,0.15)]" 
                  : "bg-slate-900/40 border-slate-800"
                )}
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
              >
                {/* Progress bar background */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-10 transition-all duration-1000 -z-10",
                    isComplete ? "from-indigo-500 to-purple-500" : "from-slate-600 to-slate-500"
                  )}
                  style={{ width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%` }}
                />

                <div className="flex items-center justify-between z-10 relative">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border transition-all",
                      isComplete ? "bg-indigo-500/20 border-indigo-400 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                      : inProgress ? "bg-slate-800 border-indigo-400 text-transparent relative" 
                      : "bg-slate-900 border-slate-700 text-transparent"
                    )}>
                      {isComplete && <Check className="h-4 w-4" />}
                      {inProgress && <div className="absolute inset-0 bg-indigo-400/20 animate-pulse rounded-full" />}
                    </div>
                    <h3 className={cn(
                      "text-lg font-bold tracking-tight transition-colors",
                      isComplete ? "text-indigo-100" : "text-white"
                    )}>
                      {section.name}
                    </h3>
                  </div>
                  <div className="text-sm font-mono text-slate-400 font-bold">
                    {completedItems} / {totalItems}
                  </div>
                </div>
              </GlassCard>

              {isExpanded && (
                <div className="mt-2 ml-4 p-4 rounded-xl border border-slate-700/50 bg-slate-900/40 animate-slide-up grid gap-4">
                  {section.items.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg border border-slate-800 bg-slate-800/30">
                      <div className="font-semibold text-sm text-slate-200">
                        {item.name}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => toggleItemProperty(section.id, item.id, "implemented")}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-colors",
                            item.implemented ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                          )}
                        >
                          <Code2 className="h-3.5 w-3.5" />
                          Impl
                        </button>
                        <button
                          onClick={() => toggleItemProperty(section.id, item.id, "projectUsed")}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-colors",
                            item.projectUsed ? "border-purple-500/50 bg-purple-500/10 text-purple-400" : "border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                          )}
                        >
                          <LayoutDashboard className="h-3.5 w-3.5" />
                          Project
                        </button>
                        <button
                          onClick={() => toggleItemProperty(section.id, item.id, "paperRead")}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-colors",
                            item.paperRead ? "border-blue-500/50 bg-blue-500/10 text-blue-400" : "border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                          )}
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          Paper
                        </button>
                        <button
                          onClick={() => toggleItemProperty(section.id, item.id, "blogRead")}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-colors",
                            item.blogRead ? "border-orange-500/50 bg-orange-500/10 text-orange-400" : "border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                          )}
                        >
                          <PenTool className="h-3.5 w-3.5" />
                          Blog
                        </button>
                        <button
                          onClick={() => toggleItemProperty(section.id, item.id, "revised")}
                          className={cn(
                            "flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-medium transition-colors",
                            item.revised ? "border-amber-500/50 bg-amber-500/10 text-amber-400" : "border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                          )}
                        >
                          <Check className="h-3.5 w-3.5" />
                          Revise
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
