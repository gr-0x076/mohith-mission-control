"use client";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthGateProps {
  children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
          <p className="text-slate-400 text-sm font-medium tracking-wider uppercase">Loading Mission Control</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
        <div className="relative w-full max-w-md">
          {/* Glow effect */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 blur-xl" />
          
          <div className="relative bg-slate-900/80 border border-slate-800 rounded-2xl p-10 text-center backdrop-blur-xl shadow-2xl">
            <div className="mb-6">
              <div className="text-[10px] font-bold tracking-[0.25em] text-purple-400 uppercase mb-2">
                Mission Control
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-1">MOHITH 2.0</h1>
              <p className="text-slate-400 text-sm">Your 40-Day Sprint Begins Here</p>
            </div>

            <div className="mb-8 border-t border-slate-800 pt-8">
              <p className="text-slate-300 text-sm leading-relaxed italic mb-2">
                &ldquo;The definition of Hell: On your last day on earth, the person you became meets the person you could have become.&rdquo;
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={signIn}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <p className="mt-4 text-xs text-slate-600">
              Your data is securely stored in Firebase under your Google account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
