import { PageShell } from "@/components/layout/PageShell";
import { MountainJourney } from "@/components/ml/MountainJourney";
import { Rocket } from "lucide-react";

export default function MLPage() {
  return (
    <PageShell>
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/30">
          <Rocket className="h-6 w-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">ML Journey</h1>
          <p className="text-sm text-slate-400 font-medium">Practical concepts, implementation, and projects</p>
        </div>
      </div>
      
      <MountainJourney />
    </PageShell>
  );
}
