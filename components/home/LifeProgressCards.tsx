"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useMission } from "@/lib/store";
import {
  Clock, Flame, Zap, Database, BrainCircuit, Github,
  Code2, GraduationCap, Rocket, Trophy
} from "lucide-react";

export function LifeProgressCards() {
  const { state } = useMission();

  // Study hours
  const totalStudyMinutes = Object.values(state.dayEntries).reduce((acc, d) => acc + d.studyMinutes, 0);
  const studyHours = (totalStudyMinutes / 60).toFixed(1);

  // Streaks
  let currentStreak = 0;
  let longestStreak = 0;
  const sortedDays = Object.keys(state.dayEntries).sort();
  for (let i = 0; i < sortedDays.length; i++) {
    const entry = state.dayEntries[sortedDays[i]];
    const completedBlocks = entry.blocks.filter(b => b.complete).length;
    if (completedBlocks > 0) {
      currentStreak++;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  }

  // DSA problems
  const leetcode = state.leetcodeTotal + state.pdsaModules.reduce((acc, m) => acc + m.leetcodeProblems, 0);
  const codeforces = state.codeforcesTotal + state.pdsaModules.reduce((acc, m) => acc + m.codeforcesProblems, 0);
  const dsaProblems = leetcode + codeforces;

  // ML Problems
  const tensortonic = state.tensortonicTotal;
  const deepml = state.deepmlTotal;
  const mlProblems = tensortonic + deepml;

  // ML concepts learned (items where at least implemented)
  const mlConcepts = state.mlJourney.reduce((acc, s) => acc + s.items.filter(i => i.implemented).length, 0);

  // IITM modules completed (MLF weeks with 100% lecture + notes)
  const iitmModules = state.mlfWeeks.filter(w => w.lectureProgress >= 100 && w.notesCompleted).length
    + state.dbmsModules.filter(m => m.lectureDone && m.revisionDone).length
    + state.madModules.filter(m => m.lectureDone && m.assignmentDone).length;

  // Incubator milestones
  const incubatorMilestones = state.incubatorPhases.filter(p => p.completionPercent >= 100).length;

  // Overall completion (rough average of all 6 tracks)
  const pdsaAvg = state.pdsaModules.reduce((a, m) => a + m.completionPercent, 0) / (state.pdsaModules.length || 1);
  const mlfAvg = state.mlfWeeks.reduce((a, w) => a + w.lectureProgress, 0) / (state.mlfWeeks.length || 1);
  const mlItems = state.mlJourney.reduce((a, s) => a + s.items.length, 0);
  const mlDone = state.mlJourney.reduce((a, s) => a + s.items.filter(i => i.implemented).length, 0);
  const mlAvg = mlItems > 0 ? (mlDone / mlItems) * 100 : 0;
  const incAvg = state.incubatorPhases.reduce((a, p) => a + p.completionPercent, 0) / (state.incubatorPhases.length || 1);
  const dbmsAvg = (state.dbmsModules.filter(m => m.lectureDone).length / (state.dbmsModules.length || 1)) * 100;
  const madAvg = (state.madModules.filter(m => m.lectureDone).length / (state.madModules.length || 1)) * 100;
  const overallCompletion = Math.round((pdsaAvg + mlfAvg + mlAvg + incAvg + dbmsAvg + madAvg) / 6);

  const cards = [
    { label: "Study Hours", value: `${studyHours} hrs`, icon: Clock, color: "text-blue-400" },
    { label: "Current Streak", value: `${currentStreak} Days`, icon: Flame, color: "text-orange-400" },
    { label: "Longest Streak", value: `${longestStreak} Days`, icon: Zap, color: "text-amber-400" },
    { label: "Overall", value: `${overallCompletion}%`, icon: Trophy, color: "text-yellow-400" },
    { label: "DSA Problems", value: dsaProblems.toString(), sub: `LC: ${leetcode} | CF: ${codeforces}`, icon: Database, color: "text-emerald-400" },
    { label: "ML Problems", value: mlProblems.toString(), sub: `TT: ${tensortonic} | DML: ${deepml}`, icon: BrainCircuit, color: "text-purple-400" },
    { label: "ML Concepts", value: mlConcepts.toString(), icon: Zap, color: "text-purple-400" },
    { label: "IITM Modules", value: iitmModules.toString(), icon: GraduationCap, color: "text-indigo-400" },
    { label: "Incubator", value: `${incubatorMilestones} / 8`, icon: Rocket, color: "text-pink-400" },
    { label: "Projects Built", value: state.projectsBuilt.toString(), icon: Trophy, color: "text-teal-400" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 animate-slide-up" style={{ animationDelay: "100ms" }}>
      {cards.map((c, i) => (
        <GlassCard key={i} glow className="flex flex-col gap-3 group">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-300 transition-colors">
              {c.label}
            </span>
            <c.icon className={`h-4 w-4 ${c.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
          </div>
          <div className="flex flex-col">
            <div className="text-xl sm:text-2xl font-bold text-slate-100 font-mono tracking-tight">
              {c.value}
            </div>
            {c.sub && (
              <div className="text-[10px] font-mono font-medium text-slate-500 mt-0.5">
                {c.sub}
              </div>
            )}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
