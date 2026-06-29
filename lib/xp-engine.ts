import { MissionState, XPState, Badge } from "./types";
import { XP_LEVEL_THRESHOLDS, XP_LEVEL_TITLES } from "./constants";

export function calculateTotalXP(state: MissionState): number {
  let xp = 0;

  // 1. Learning XP
  state.mlfWeeks.forEach(w => {
    if (w.lectureProgress >= 100) xp += 20;
    if (w.notesCompleted) xp += 10;
    if (w.revisionDone) xp += 15;
    if (w.lectureProgress >= 100 && w.notesCompleted && w.revisionDone) xp += 100;
  });
  
  state.dbmsModules.forEach(m => {
    if (m.lectureDone) xp += 20;
    if (m.revisionDone) xp += 15;
  });

  state.pdsaModules.forEach(m => {
    if (m.completionPercent >= 100) xp += 50;
    xp += (m.revisionCount * 15);
  });

  // 2. DSA & CP XP
  const totalLC = state.leetcodeTotal + state.pdsaModules.reduce((a, m) => a + m.leetcodeProblems, 0);
  xp += (totalLC * 15); // LeetCode

  const totalCF = state.codeforcesTotal + state.pdsaModules.reduce((a, m) => a + m.codeforcesProblems, 0);
  xp += (totalCF * 30); // Codeforces - Double XP for CF

  // Contests
  Object.values(state.dayEntries).forEach(entry => {
    entry.blocks.forEach(b => {
      if (b.complete) {
        if (b.title.includes("Codeforces")) xp += 120;
        else if (b.title.includes("AtCoder")) xp += 120;
        else if (b.title.includes("LeetCode") && b.title.includes("Contest")) xp += 80;
        else if (b.title.includes("CodeChef")) xp += 80;
        else if (b.title.includes("Kaggle")) xp += 60;
        else if (b.title.includes("HackerRank")) xp += 60;
      }
    });
  });

  // 3. ML XP
  xp += (state.tensortonicTotal * 50);
  xp += (state.deepmlTotal * 50);

  state.mlJourney.forEach(s => {
    s.items.forEach(i => {
      if (i.implemented) xp += 60;
      if (i.blogRead) xp += 20;
      if (i.paperRead) xp += 50;
      if (i.revised) xp += 25;
    });
  });

  // 4. Builder XP
  xp += (state.githubCommits * 10);
  xp += (state.projectsBuilt * 300);
  
  state.incubatorPhases.forEach(p => {
    if (p.completionPercent >= 100) xp += 150;
  });

  // 5. Discipline / Streaks
  let currentStreak = 0;
  const sortedDays = Object.keys(state.dayEntries).sort();
  for (let i = 0; i < sortedDays.length; i++) {
    const entry = state.dayEntries[sortedDays[i]];
    const completedBlocks = entry.blocks.filter(b => b.complete).length;
    
    if (completedBlocks > 0 && completedBlocks === entry.blocks.length) xp += 100;
    
    if (entry.studyMinutes >= 240) xp += 40;
    if (entry.studyMinutes >= 360) xp += 70;
    if (entry.studyMinutes >= 480) xp += 100;

    if (completedBlocks > 0) {
      currentStreak++;
      if (currentStreak % 3 === 0) xp += 50;
      if (currentStreak % 7 === 0) xp += 150;
      if (currentStreak % 15 === 0) xp += 400;
      if (currentStreak % 30 === 0) xp += 1000;
    } else {
      currentStreak = 0;
    }
  }

  return xp;
}

export function calculateXPState(state: MissionState): XPState {
  const totalXP = calculateTotalXP(state);
  let level = 0;
  for (let i = 0; i < XP_LEVEL_THRESHOLDS.length; i++) {
    if (totalXP >= XP_LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  const titleIndex = Math.min(level - 1, XP_LEVEL_TITLES.length - 1);
  return {
    totalXP,
    level,
    levelTitle: XP_LEVEL_TITLES[titleIndex] || "Elite Engineer",
  };
}

export function checkBadges(state: MissionState): Badge[] {
  const newBadges = [...state.badges];
  const now = new Date().toISOString();

  const totalLC = state.leetcodeTotal + state.pdsaModules.reduce((a, m) => a + m.leetcodeProblems, 0);
  const totalCF = state.codeforcesTotal + state.pdsaModules.reduce((a, m) => a + m.codeforcesProblems, 0);
  const totalProblemsSolved = totalLC + totalCF;
  
  let contestsAttended = 0;
  let maxStreak = 0;
  let currentStreak = 0;
  
  Object.values(state.dayEntries).forEach(entry => {
    entry.blocks.forEach(b => {
      if (b.complete && (b.title.includes("Codeforces") || b.title.includes("LeetCode") || b.title.includes("CodeChef") || b.title.includes("AtCoder"))) {
        contestsAttended++;
      }
    });
  });

  const sortedDays = Object.keys(state.dayEntries).sort();
  for (let i = 0; i < sortedDays.length; i++) {
    const entry = state.dayEntries[sortedDays[i]];
    const completedBlocks = entry.blocks.filter(b => b.complete).length;
    if (completedBlocks > 0) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  }

  const pdsaModulesComplete = state.pdsaModules.filter(m => m.completionPercent >= 100).length;
  const mlfWeeksComplete = state.mlfWeeks.filter(w => w.lectureProgress >= 100 && w.notesCompleted).length;
  const incubatorPhasesComplete = state.incubatorPhases.filter(p => p.completionPercent >= 100).length;
  
  // Specific DSA Topic Check
  const graphComplete = state.pdsaModules.find(m => m.id === "pdsa-5")?.completionPercent === 100;
  const treesComplete = state.pdsaModules.find(m => m.id === "pdsa-7")?.completionPercent === 100;
  const dpComplete = state.pdsaModules.find(m => m.id === "pdsa-10")?.completionPercent === 100;

  const updateBadge = (id: string, condition: boolean) => {
    const badge = newBadges.find(b => b.id === id);
    if (badge && !badge.unlocked && condition) {
      badge.unlocked = true;
      badge.unlockedAt = now;
    }
  };

  // DSA
  updateBadge("b-dsa-50", totalProblemsSolved >= 50);
  updateBadge("b-dsa-100", totalProblemsSolved >= 100);
  updateBadge("b-dsa-250", totalProblemsSolved >= 250);
  updateBadge("b-dsa-500", totalProblemsSolved >= 500);
  updateBadge("b-dsa-graph", graphComplete);
  updateBadge("b-dsa-tree", treesComplete);
  updateBadge("b-dsa-dp", dpComplete);

  // CP
  updateBadge("b-cp-1", contestsAttended >= 1);
  updateBadge("b-cp-5", contestsAttended >= 5);
  updateBadge("b-cp-10", contestsAttended >= 10);

  // ML
  updateBadge("b-mlf-half", mlfWeeksComplete >= 6);
  updateBadge("b-mlf-all", mlfWeeksComplete >= 12);
  updateBadge("b-ml-tt", state.tensortonicTotal >= 10);
  
  // Builder
  updateBadge("b-build-streak", state.githubCommits >= 10);
  updateBadge("b-build-proj", state.projectsBuilt >= 1);
  
  // Incubator
  updateBadge("b-inc-2", state.incubatorPhases.find(p => p.id === "inc-2")?.completionPercent === 100);
  updateBadge("b-inc-3", state.incubatorPhases.find(p => p.id === "inc-3")?.completionPercent === 100);
  updateBadge("b-inc-4", state.incubatorPhases.find(p => p.id === "inc-4")?.completionPercent === 100);
  updateBadge("b-inc-5", state.incubatorPhases.find(p => p.id === "inc-5")?.completionPercent === 100);
  updateBadge("b-inc-all", incubatorPhasesComplete >= 8);

  return newBadges;
}

export const INITIAL_BADGES: Badge[] = [
  { id: "b-dsa-50", name: "First 50 Problems", description: "Solve 50 DSA problems.", icon: "🥉", unlocked: false, condition: "totalProblemsSolved >= 50" },
  { id: "b-dsa-100", name: "First 100 Problems", description: "Solve 100 DSA problems.", icon: "🥈", unlocked: false, condition: "totalProblemsSolved >= 100" },
  { id: "b-dsa-250", name: "250 Problems", description: "Solve 250 DSA problems.", icon: "🥇", unlocked: false, condition: "totalProblemsSolved >= 250" },
  { id: "b-dsa-500", name: "500 Problems", description: "Solve 500 DSA problems.", icon: "💎", unlocked: false, condition: "totalProblemsSolved >= 500" },
  { id: "b-dsa-graph", name: "Graph Slayer", description: "Complete the Graph Algorithms module.", icon: "🧠", unlocked: false, condition: "graphComplete" },
  { id: "b-dsa-tree", name: "Tree Master", description: "Complete the Trees & Advanced DS module.", icon: "🌳", unlocked: false, condition: "treesComplete" },
  { id: "b-dsa-dp", name: "DP Survivor", description: "Complete the Dynamic Programming module.", icon: "⚡", unlocked: false, condition: "dpComplete" },
  
  { id: "b-cp-1", name: "First Contest", description: "Attend your first coding contest.", icon: "🚀", unlocked: false, condition: "contestsAttended >= 1" },
  { id: "b-cp-5", name: "5 Contests", description: "Attend 5 coding contests.", icon: "🏹", unlocked: false, condition: "contestsAttended >= 5" },
  { id: "b-cp-10", name: "10 Contests", description: "Attend 10 coding contests.", icon: "⚔️", unlocked: false, condition: "contestsAttended >= 10" },

  { id: "b-mlf-half", name: "ML Apprentice", description: "Complete 6 out of 12 MLF weeks.", icon: "📈", unlocked: false, condition: "mlfWeeksComplete >= 6" },
  { id: "b-mlf-all", name: "ML Master", description: "Complete all 12 MLF IITM weeks.", icon: "🎓", unlocked: false, condition: "mlfWeeksComplete >= 12" },
  { id: "b-ml-tt", name: "Tensor Titan", description: "Solve 10 TensorTonic problems.", icon: "🤖", unlocked: false, condition: "tensortonicTotal >= 10" },

  { id: "b-build-streak", name: "GitHub Streak", description: "Make 10 GitHub commits.", icon: "🐙", unlocked: false, condition: "githubCommits >= 10" },
  { id: "b-build-proj", name: "Project Finisher", description: "Build and finish a complete project.", icon: "🛠️", unlocked: false, condition: "projectsBuilt >= 1" },

  { id: "b-inc-2", name: "Dataset Ready", description: "Complete Incubator Phase 2 (Dataset).", icon: "🎯", unlocked: false, condition: "Phase 2 Complete" },
  { id: "b-inc-3", name: "Baseline Built", description: "Complete Incubator Phase 3 (Baseline).", icon: "🧭", unlocked: false, condition: "Phase 3 Complete" },
  { id: "b-inc-4", name: "Intent Engine", description: "Complete Incubator Phase 4 (Intent Modeling).", icon: "🧠", unlocked: false, condition: "Phase 4 Complete" },
  { id: "b-inc-5", name: "FAISS Integrated", description: "Complete Incubator Phase 5 (Retrieval).", icon: "⚡", unlocked: false, condition: "Phase 5 Complete" },
  { id: "b-inc-all", name: "Demo Day", description: "Complete all 8 Incubator phases.", icon: "🏆", unlocked: false, condition: "incubatorPhasesComplete >= 8" },
];
