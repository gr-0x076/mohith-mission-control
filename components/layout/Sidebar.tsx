"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Brain,
  GraduationCap,
  Rocket,
  Beaker,
  Database,
  Code2,
  BarChart3,
  Award,
  Menu,
  X,
} from "lucide-react";
import { useMission } from "@/lib/store";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/pdsa", label: "PDSA", icon: Brain },
  { href: "/mlf", label: "MLF (IITM)", icon: GraduationCap },
  { href: "/ml", label: "ML Journey", icon: Rocket },
  { href: "/incubator", label: "Incubator", icon: Beaker },
  { href: "/dbms", label: "DBMS", icon: Database },
  { href: "/mad", label: "MAD I", icon: Code2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/xp", label: "XP & Badges", icon: Award },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useMission();

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/90 text-white backdrop-blur lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800/80 bg-[#09090b]/95 px-4 py-6 backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 flex items-start justify-between gap-3 px-2">
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              Mission Control
            </div>
            <div className="mt-1 text-xl font-bold tracking-tight text-slate-200">
              MOHITH 2.0
            </div>
          </div>
          <button
            type="button"
            onClick={closeMobile}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMobile}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-purple-500/10 text-white shadow-[0_0_15px_rgba(124,58,237,0.1)]"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                )}
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-purple-400" : "group-hover:text-purple-400"
                  )}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 shrink-0 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {state.xp.levelTitle}
            </div>
            <div className="text-xs font-bold text-purple-400">
              Lvl {state.xp.level}
            </div>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${(state.xp.totalXP % 1000) / 10}%` }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
