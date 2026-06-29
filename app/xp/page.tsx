import { PageShell } from "@/components/layout/PageShell";
import { LevelBar } from "@/components/xp/LevelBar";
import { BadgeGrid } from "@/components/xp/BadgeGrid";
import { Award } from "lucide-react";

export default function XPPage() {
  return (
    <PageShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20 border border-yellow-500/30">
          <Award className="h-6 w-6 text-yellow-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Experience & Badges</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Level up Mohith v2.0</p>
        </div>
      </div>
      
      <div className="animate-slide-up">
        <LevelBar />
        
        <div className="mt-12">
          <h3 className="text-lg font-bold text-slate-200 mb-2">Achievement Badges</h3>
          <p className="text-sm text-slate-400 mb-6">Unlock these by maintaining streaks, solving problems, and finishing projects.</p>
          <BadgeGrid />
        </div>
      </div>
    </PageShell>
  );
}
