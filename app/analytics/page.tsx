"use client";

import React, { useMemo } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { useMission } from "@/lib/store";
import { BarChart3 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid
} from 'recharts';
import { getDaysRemaining, getDayNumber } from "@/lib/date-utils";

export default function AnalyticsPage() {
  const { state } = useMission();

  const totalDays = getDaysRemaining(state.missionStart, state.missionEnd) + getDayNumber(state.missionStart, state.currentDay);
  
  const heatmapData = useMemo(() => {
    const data = [];
    let currentDate = new Date(state.missionStart);
    for (let i = 0; i < totalDays; i++) {
      const dateStr = currentDate.toISOString().split("T")[0];
      const entry = state.dayEntries[dateStr];
      let intensity = 0;
      if (entry) {
        const completed = entry.blocks.filter(b => b.complete).length;
        if (completed > 0) intensity = 1;
        if (completed >= 3) intensity = 2;
        if (completed >= 6) intensity = 3;
        if (completed >= 8) intensity = 4;
      }
      data.push({ date: dateStr, intensity });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  }, [state, totalDays]);

  const trendData = useMemo(() => {
    return Object.values(state.dayEntries)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(entry => ({
        date: entry.date.substring(5), // MM-DD
        studyHours: Number((entry.studyMinutes / 60).toFixed(1)),
        leetcodeProblems: entry.leetcodeProblems,
        codeforcesProblems: entry.codeforcesProblems,
        tensortonicProblems: entry.tensortonicProblems,
        deepmlProblems: entry.deepmlProblems
      }));
  }, [state]);

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 1: return "bg-purple-900/40 border-purple-500/20";
      case 2: return "bg-purple-700/60 border-purple-500/40";
      case 3: return "bg-purple-500/80 border-purple-500/60";
      case 4: return "bg-purple-400 border-purple-400 shadow-[0_0_10px_rgba(167,139,250,0.6)]";
      default: return "bg-slate-800/30 border-slate-700/30";
    }
  };

  return (
    <PageShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 border border-blue-500/30">
          <BarChart3 className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Analytics</h1>
          <p className="text-sm text-slate-400 font-medium">Mission telemetry & performance metrics</p>
        </div>
      </div>

      <div className="grid gap-6 animate-slide-up">
        
        {/* Heatmap */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">40-Day Intensity Map</h3>
          <div className="flex flex-wrap gap-2 max-w-[800px]">
            {heatmapData.map((day, i) => (
              <div
                key={day.date}
                title={`${day.date} - Intensity ${day.intensity}`}
                className={`h-4 w-4 rounded-sm border transition-all hover:scale-125 ${getIntensityColor(day.intensity)}`}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className={`h-3 w-3 rounded-sm border ${getIntensityColor(i)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </GlassCard>

        {/* Study Hours Trend */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Study Hours Trend</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#E2E8F0' }}
                />
                <Area type="monotone" dataKey="studyHours" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorStudy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Problem Solving Trend */}
        <GlassCard>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6">Problem Solving Trend</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="date" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#E2E8F0' }}
                />
                <Bar dataKey="leetcodeProblems" name="LeetCode" fill="#10B981" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="codeforcesProblems" name="Codeforces" fill="#3B82F6" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="tensortonicProblems" name="TensorTonic" fill="#8B5CF6" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="deepmlProblems" name="DeepML" fill="#EC4899" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>
    </PageShell>
  );
}
