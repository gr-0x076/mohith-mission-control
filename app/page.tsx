"use client";

import React from "react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroGreeting } from "@/components/home/HeroGreeting";
import { ProgressRing } from "@/components/home/ProgressRing";
import { LifeProgressCards } from "@/components/home/LifeProgressCards";
import { DailyMission } from "@/components/home/DailyMission";
import { ContestsSchedule } from "@/components/home/ContestsSchedule";
import { VisionCard } from "@/components/home/VisionCard";

export default function Home() {
  return (
    <PageShell>
      <div className="flex flex-col gap-8 md:gap-12">
        <HeroGreeting />
        
        <div className="mt-4">
          <ProgressRing />
        </div>
        
        <div className="-mt-8 relative z-10">
          <LifeProgressCards />
        </div>

        <div className="mt-8">
          <DailyMission />
        </div>

        <div className="mt-4">
          <ContestsSchedule />
        </div>

        <div className="mt-4">
          <VisionCard />
        </div>
      </div>
    </PageShell>
  );
}
