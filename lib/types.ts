// ── Daily tracking ──────────────────────────────────────────────

export type DailyBlock = {
  id: string;
  title: string;
  minutes: number;
  complete: boolean;
  category?: string;
};

export type DayEntry = {
  date: string;
  blocks: DailyBlock[];
  studyMinutes: number;
  problemsSolved: number;
  leetcodeProblems: number;
  codeforcesProblems: number;
  tensortonicProblems: number;
  deepmlProblems: number;
  xpEarned: number;
  notes: string;
};

// ── Mission templates ───────────────────────────────────────────

export type MissionTemplate = {
  id: string;
  title: string;
  minutes: number;
};

// ── Track 1: PDSA ───────────────────────────────────────────────

export type PDSASubtopic = {
  id: string;
  name: string;
  completed: boolean;
};

export type PDSAModule = {
  id: string;
  name: string;
  subtopics: PDSASubtopic[];
  completionPercent: number;
  leetcodeProblems: number;
  codeforcesProblems: number;
  revisionCount: number;
  confidence: number; // 0-5
  notes: string;
};

// ── Track 2: MLF IITM ──────────────────────────────────────────

export type MLFSubtopic = {
  id: string;
  name: string;
};

export type MLFWeek = {
  id: string;
  weekNumber: number;
  title: string;
  subtopics: MLFSubtopic[];
  lectureProgress: number; // 0-100
  notesCompleted: boolean;
  implementationDone: boolean;
  revisionDone: boolean;
  confidence: number; // 0-5
};

// ── Track 3: ML Journey ─────────────────────────────────────────

export type MLJourneyItem = {
  id: string;
  name: string;
  implemented: boolean;
  revised: boolean;
  projectUsed: boolean;
  blogRead: boolean;
  paperRead: boolean;
};

export type MLJourneySection = {
  id: string;
  name: string;
  items: MLJourneyItem[];
};

// ── Track 4: Incubator ──────────────────────────────────────────

export type IncubatorTask = {
  id: string;
  name: string;
  completed: boolean;
};

export type IncubatorPhase = {
  id: string;
  name: string;
  tasks: IncubatorTask[];
  completionPercent: number;
};

// ── Track 5: DBMS ───────────────────────────────────────────────

export type DBMSModule = {
  id: string;
  name: string;
  lectureDone: boolean;
  revisionDone: boolean;
  sqlPracticeDone: boolean;
};

// ── Track 6: MAD I ──────────────────────────────────────────────

export type MADModule = {
  id: string;
  name: string;
  lectureDone: boolean;
  assignmentDone: boolean;
  projectProgress: number; // 0-100
};

// ── XP & Badges ─────────────────────────────────────────────────

export type XPState = {
  totalXP: number;
  level: number;
  levelTitle: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  condition: string;
};

// ── Top-level state ─────────────────────────────────────────────

export type MissionState = {
  missionStart: string;
  missionEnd: string;
  currentDay: string;
  githubCommits: number;
  leetcodeTotal: number;
  codeforcesTotal: number;
  tensortonicTotal: number;
  deepmlTotal: number;
  projectsBuilt: number;

  dailyMissionTemplates: MissionTemplate[];
  dayEntries: Record<string, DayEntry>;

  // Track 1
  pdsaModules: PDSAModule[];
  // Track 2
  mlfWeeks: MLFWeek[];
  // Track 3
  mlJourney: MLJourneySection[];
  // Track 4
  incubatorPhases: IncubatorPhase[];
  // Track 5
  dbmsModules: DBMSModule[];
  // Track 6
  madModules: MADModule[];

  xp: XPState;
  badges: Badge[];
};
