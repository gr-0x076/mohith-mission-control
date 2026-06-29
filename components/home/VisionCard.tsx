"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export function VisionCard() {
  return (
    <div className="relative mt-12 mb-8 rounded-2xl overflow-hidden border border-slate-700/50 p-8 sm:p-12 animate-slide-up" style={{ animationDelay: "400ms" }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent" />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'.8\'/%3E%3C/svg%3E")' }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center mb-6">
          <Sparkles className="h-6 w-6 text-purple-400 opacity-60" />
        </div>
        
        <h2 
          className="text-2xl sm:text-3xl lg:text-4xl leading-relaxed text-slate-200 font-medium italic"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          "The definition of Hell: <br className="hidden sm:block"/>
          <span className="text-slate-400">On your last day on earth, the person you became meets the person you could have become."</span>
        </h2>
      </div>
    </div>
  );
}
