"use client";

import React, { createContext, useContext, useEffect, useReducer, useRef, useState, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { loadStateFromFirestore, saveStateToFirestore } from "./firestore";
import { MissionState, DayEntry } from "./types";
import {
  DEFAULT_MISSION_TEMPLATES,
  PDSA_MODULES_TEMPLATE,
  MLF_WEEKS_TEMPLATE,
  ML_JOURNEY_TEMPLATE,
  INCUBATOR_PHASES_TEMPLATE,
  DBMS_MODULES_TEMPLATE,
  MAD_MODULES_TEMPLATE,
} from "./constants";
import { getTodayStr } from "./date-utils";
import { calculateXPState, checkBadges, INITIAL_BADGES } from "./xp-engine";

const initialState: MissionState = {
  missionStart: "2026-07-03",
  missionEnd: "2026-08-15",
  currentDay: getTodayStr(),
  githubCommits: 0,
  leetcodeTotal: 0,
  codeforcesTotal: 0,
  tensortonicTotal: 0,
  deepmlTotal: 0,
  projectsBuilt: 0,

  dailyMissionTemplates: DEFAULT_MISSION_TEMPLATES,
  dayEntries: {},

  pdsaModules: PDSA_MODULES_TEMPLATE,
  mlfWeeks: MLF_WEEKS_TEMPLATE,
  mlJourney: ML_JOURNEY_TEMPLATE,
  incubatorPhases: INCUBATOR_PHASES_TEMPLATE,
  dbmsModules: DBMS_MODULES_TEMPLATE,
  madModules: MAD_MODULES_TEMPLATE,

  xp: { totalXP: 0, level: 1, levelTitle: "Curious Fresher" },
  badges: INITIAL_BADGES,
};

export function createEmptyDayEntry(date: string): DayEntry {
  return {
    date,
    blocks: [],
    studyMinutes: 0,
    problemsSolved: 0,
    leetcodeProblems: 0,
    codeforcesProblems: 0,
    tensortonicProblems: 0,
    deepmlProblems: 0,
    xpEarned: 0,
    notes: "",
  };
}

type Action =
  | { type: "INIT"; payload: MissionState }
  | { type: "UPDATE_STATE"; payload: Partial<MissionState> }
  | { type: "UPDATE_DAY_ENTRY"; payload: { date: string; entry: Partial<DayEntry> } };

function reducer(state: MissionState, action: Action): MissionState {
  let newState = state;
  switch (action.type) {
    case "INIT":
      newState = { ...action.payload };
      break;
    case "UPDATE_STATE":
      newState = { ...state, ...action.payload };
      break;
    case "UPDATE_DAY_ENTRY": {
      const { date, entry } = action.payload;
      const currentEntry = state.dayEntries[date] || createEmptyDayEntry(date);
      newState = {
        ...state,
        dayEntries: {
          ...state.dayEntries,
          [date]: { ...currentEntry, ...entry },
        },
      };
      break;
    }
    default:
      return state;
  }

  // Recalculate badges and XP on every state change
  const badges = checkBadges(newState);
  const xp = calculateXPState(newState);

  return { ...newState, badges, xp };
}

const MissionContext = createContext<{
  state: MissionState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);
  const userIdRef = useRef<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On auth state change, load data from Firestore
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        userIdRef.current = user.uid;
        const todayStr = getTodayStr();
        try {
          const saved = await loadStateFromFirestore(user.uid);
          if (saved) {
            if (!saved.dayEntries) saved.dayEntries = {};
            if (!saved.dayEntries[todayStr]) {
              saved.dayEntries[todayStr] = createEmptyDayEntry(todayStr);
            }
            dispatch({ type: "INIT", payload: { ...initialState, ...saved, currentDay: todayStr } });
          } else {
            // First time user — fresh state
            const fresh = { ...initialState, currentDay: todayStr };
            fresh.dayEntries[todayStr] = createEmptyDayEntry(todayStr);
            dispatch({ type: "INIT", payload: fresh });
          }
        } catch (e) {
          console.error("Firestore load failed:", e);
        }
        setIsLoaded(true);
      } else {
        userIdRef.current = null;
        setIsLoaded(false);
      }
    });
    return unsub;
  }, []);

  // Debounced save — writes to Firestore at most once per 2 seconds
  useEffect(() => {
    if (!isLoaded || !userIdRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      if (userIdRef.current) {
        saveStateToFirestore(userIdRef.current, state);
      }
    }, 2000);
  }, [state, isLoaded]);

  if (!isLoaded) return null;

  return (
    <MissionContext.Provider value={{ state, dispatch }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMission must be used within MissionProvider");
  return ctx;
}
