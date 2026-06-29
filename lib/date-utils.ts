import { useState, useEffect } from "react";

export function getTodayStr(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function useCurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}

export function getGreeting(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export function getDayNumber(startStr: string, todayStr: string): number {
  const start = new Date(startStr + "T00:00:00").getTime();
  const today = new Date(todayStr + "T00:00:00").getTime();
  if (Number.isNaN(start) || Number.isNaN(today)) return 1;
  const diff = today - start;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days + 1;
}

export function getDaysRemaining(todayStr: string, endStr: string): number {
  const today = new Date(todayStr + "T00:00:00").getTime();
  const end = new Date(endStr + "T00:00:00").getTime();
  if (Number.isNaN(today) || Number.isNaN(end)) return 0;
  const diff = end - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

export function formatCountdown(days: number): string {
  return `${days} Days Remaining`;
}

export function isPast(dateStr: string, todayStr: string): boolean {
  return dateStr < todayStr;
}

export function isFuture(dateStr: string, todayStr: string): boolean {
  return dateStr > todayStr;
}
