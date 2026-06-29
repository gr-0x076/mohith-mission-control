"use client";

import React from "react";
import { useMission } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Database, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageShell } from "@/components/layout/PageShell";

export default function DBMSPage() {
  const { state, dispatch } = useMission();

  const updateModule = (moduleId: string, property: keyof import("@/lib/types").DBMSModule) => {
    const newModules = state.dbmsModules.map(m => {
      if (m.id !== moduleId) return m;
      return { ...m, [property]: !(m as any)[property] };
    });
    dispatch({ type: "UPDATE_STATE", payload: { dbmsModules: newModules } });
  };

  return (
    <PageShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30">
          <Database className="h-6 w-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">DBMS</h1>
          <p className="text-sm text-slate-400 font-medium">IIT Madras Curriculum</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-slide-up">
        {state.dbmsModules.map((mod, index) => {
          const isDone = mod.lectureDone && mod.revisionDone && mod.sqlPracticeDone;
          const inProgress = mod.lectureDone || mod.revisionDone || mod.sqlPracticeDone;

          return (
            <GlassCard
              key={mod.id}
              glow={isDone || inProgress}
              className={cn(
                "flex flex-col gap-4 transition-all duration-300",
                isDone ? "border-green-500/30" : inProgress ? "border-emerald-500/30" : ""
              )}
            >
              <div className="flex justify-between items-start">
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

              {/* Toggles */}
              <div className="grid grid-cols-1 gap-2 mt-auto pt-4 border-t border-slate-800">
                {[
                  { key: "lectureDone" as const, label: "Lecture" },
                  { key: "revisionDone" as const, label: "Revision" },
                  { key: "sqlPracticeDone" as const, label: "SQL Practice" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => updateModule(mod.id, key)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-1.5 rounded-lg border text-left text-xs font-medium transition-all",
                      mod[key]
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    )}
                  >
                    <div className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                      mod[key] ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" : "border-slate-600 bg-slate-900 text-transparent"
                    )}>
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </div>
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
