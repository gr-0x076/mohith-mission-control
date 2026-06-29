"use client";

import React, { useState, useEffect } from "react";
import { useMission } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Target, Check, Plus, Trash2, Code2, BrainCircuit } from "lucide-react";
import { MissionComplete } from "./MissionComplete";

export function DailyMission() {
  const { state, dispatch } = useMission();
  const todayEntry = state.dayEntries[state.currentDay];
  const [showCelebration, setShowCelebration] = useState(false);

  // Auto-populate removed as requested

  if (!todayEntry) return null;

  const blocks = todayEntry.blocks;
  const completedCount = blocks.filter(b => b.complete).length;
  const totalCount = blocks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const allComplete = totalCount > 0 && completedCount === totalCount;

  useEffect(() => {
    if (allComplete) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [allComplete]);

  const toggleBlock = (id: string) => {
    const newBlocks = blocks.map(b => b.id === id ? { ...b, complete: !b.complete } : b);
    dispatch({ type: "UPDATE_DAY_ENTRY", payload: { date: state.currentDay, entry: { blocks: newBlocks } } });
  };

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter(b => b.id !== id);
    dispatch({ type: "UPDATE_DAY_ENTRY", payload: { date: state.currentDay, entry: { blocks: newBlocks } } });
  };

  const addBlock = () => {
    const newBlock = { id: `b-${Date.now()}`, title: "New Task", minutes: 30, complete: false, category: "Other" };
    dispatch({ type: "UPDATE_DAY_ENTRY", payload: { date: state.currentDay, entry: { blocks: [...blocks, newBlock] } } });
  };

  return (
    <div className="relative rounded-xl border border-slate-700 bg-slate-900/60 overflow-hidden backdrop-blur-md animate-slide-up" style={{ animationDelay: "200ms" }}>
      {showCelebration && <MissionComplete />}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mission-grid" />

      <div className="relative p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-mono tracking-tight text-slate-100 uppercase">Today&apos;s Mission</h2>
              <div className="text-xs font-semibold text-slate-500 tracking-widest uppercase">Operations Board</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-[120px] h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-mono text-green-400 font-bold">{Math.round(progressPercent)}%</span>
            <button onClick={addBlock} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-2">
          {blocks.map((b) => (
            <div
              key={b.id}
              className={cn(
                "relative group flex items-center justify-between p-3 rounded-lg border transition-all duration-300 overflow-hidden",
                b.complete ? "border-green-500/30 bg-green-500/5" : "border-slate-800/80 bg-slate-800/30 hover:border-slate-700"
              )}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent transition-transform duration-700 ease-out origin-left",
                b.complete ? "scale-x-100" : "scale-x-0"
              )} />

              <div className="relative flex items-center gap-4 z-10">
                <button
                  onClick={() => toggleBlock(b.id)}
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded border transition-colors",
                    b.complete ? "border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "border-slate-600 bg-slate-900 text-transparent hover:border-slate-400"
                  )}
                >
                  <Check className="h-4 w-4" strokeWidth={3} />
                </button>
                <input
                  type="text"
                  value={b.title}
                  onChange={(e) => {
                    const newBlocks = blocks.map(x => x.id === b.id ? { ...x, title: e.target.value } : x);
                    dispatch({ type: "UPDATE_DAY_ENTRY", payload: { date: state.currentDay, entry: { blocks: newBlocks } } });
                  }}
                  className={cn(
                    "bg-transparent outline-none font-mono text-sm sm:text-base w-[120px] sm:w-[200px] transition-colors",
                    b.complete ? "text-slate-300" : "text-slate-100"
                  )}
                />
                
                {/* Category selector */}
                <select
                  value={b.category || "Other"}
                  onChange={(e) => {
                    const newBlocks = blocks.map(x => x.id === b.id ? { ...x, category: e.target.value } : x);
                    dispatch({ type: "UPDATE_DAY_ENTRY", payload: { date: state.currentDay, entry: { blocks: newBlocks } } });
                  }}
                  className={cn(
                    "bg-slate-800/50 border border-slate-700 rounded px-2 py-1 text-xs outline-none text-slate-300 transition-colors cursor-pointer",
                    b.complete && "opacity-50"
                  )}
                >
                  <option value="PDSA">PDSA</option>
                  <option value="MLF">MLF</option>
                  <option value="ML Journey">ML Journey</option>
                  <option value="Incubator">Incubator</option>
                  <option value="DBMS">DBMS</option>
                  <option value="MAD I">MAD I</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="relative flex items-center gap-3 z-10">
                <span className="text-xs font-mono text-slate-500">
                  {Math.floor(b.minutes / 60) > 0 ? `${Math.floor(b.minutes / 60)}h ` : ""}{b.minutes % 60 > 0 ? `${b.minutes % 60}m` : ""}
                </span>
                <button
                  onClick={() => removeBlock(b.id)}
                  className="p-1.5 rounded-md text-slate-600 hover:text-red-400 hover:bg-slate-800 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Global Problems Tracking */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Code2 className="h-3 w-3 text-green-400" /> LeetCode
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => dispatch({ type: "UPDATE_STATE", payload: { leetcodeTotal: Math.max(0, state.leetcodeTotal - 1) }})} className="px-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400">-</button>
              <span className="font-mono text-sm font-bold text-slate-200">{state.leetcodeTotal}</span>
              <button onClick={() => dispatch({ type: "UPDATE_STATE", payload: { leetcodeTotal: state.leetcodeTotal + 1 }})} className="px-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400">+</button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <Code2 className="h-3 w-3 text-cyan-400" /> Codeforces
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => dispatch({ type: "UPDATE_STATE", payload: { codeforcesTotal: Math.max(0, state.codeforcesTotal - 1) }})} className="px-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400">-</button>
              <span className="font-mono text-sm font-bold text-slate-200">{state.codeforcesTotal}</span>
              <button onClick={() => dispatch({ type: "UPDATE_STATE", payload: { codeforcesTotal: state.codeforcesTotal + 1 }})} className="px-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400">+</button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <BrainCircuit className="h-3 w-3 text-purple-400" /> TensorTonic
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => dispatch({ type: "UPDATE_STATE", payload: { tensortonicTotal: Math.max(0, state.tensortonicTotal - 1) }})} className="px-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400">-</button>
              <span className="font-mono text-sm font-bold text-slate-200">{state.tensortonicTotal}</span>
              <button onClick={() => dispatch({ type: "UPDATE_STATE", payload: { tensortonicTotal: state.tensortonicTotal + 1 }})} className="px-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400">+</button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <BrainCircuit className="h-3 w-3 text-pink-400" /> DeepML
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => dispatch({ type: "UPDATE_STATE", payload: { deepmlTotal: Math.max(0, state.deepmlTotal - 1) }})} className="px-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400">-</button>
              <span className="font-mono text-sm font-bold text-slate-200">{state.deepmlTotal}</span>
              <button onClick={() => dispatch({ type: "UPDATE_STATE", payload: { deepmlTotal: state.deepmlTotal + 1 }})} className="px-2 bg-slate-800 rounded hover:bg-slate-700 text-slate-400">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
