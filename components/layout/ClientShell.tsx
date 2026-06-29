"use client";

import dynamic from "next/dynamic";
import React from "react";

// Load everything that touches Firebase only on the client (never during SSG/SSR)
const AuthGate = dynamic(
  () => import("@/components/auth/AuthGate").then((m) => m.AuthGate),
  { ssr: false }
);
const MissionProvider = dynamic(
  () => import("@/lib/store").then((m) => m.MissionProvider),
  { ssr: false }
);
const ParticleBackground = dynamic(
  () => import("@/components/layout/ParticleBackground").then((m) => m.ParticleBackground),
  { ssr: false }
);
const Sidebar = dynamic(
  () => import("@/components/layout/Sidebar").then((m) => m.Sidebar),
  { ssr: false }
);

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <MissionProvider>
        <ParticleBackground />
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 overflow-x-hidden">
            {children}
          </div>
        </div>
      </MissionProvider>
    </AuthGate>
  );
}
