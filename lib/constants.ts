import {
  PDSAModule, MLFWeek, MLJourneySection, IncubatorPhase,
  DBMSModule, MADModule, MissionTemplate,
} from "./types";

// ── Daily mission templates ─────────────────────────────────────

export const DEFAULT_MISSION_TEMPLATES: MissionTemplate[] = [
  { id: "m-1", title: "PDSA (3 hrs)", minutes: 180 },
  { id: "m-2", title: "Solve 10 LC", minutes: 90 },
  { id: "m-3", title: "Solve 10 CF", minutes: 90 },
  { id: "m-4", title: "MLF Week", minutes: 120 },
  { id: "m-5", title: "IntentRec", minutes: 120 },
  { id: "m-6", title: "DBMS Lecture", minutes: 60 },
  { id: "m-7", title: "MAD I", minutes: 60 },
  { id: "m-8", title: "Read Paper", minutes: 45 },
  { id: "m-9", title: "Revise Notes", minutes: 30 },
];

// ── Helpers ─────────────────────────────────────────────────────

let _uid = 0;
const uid = (prefix: string) => `${prefix}-${++_uid}`;

function makeSubs(prefix: string, names: string[]) {
  return names.map(n => ({ id: uid(prefix), name: n, completed: false }));
}

// ── Track 1: PDSA ───────────────────────────────────────────────

export const PDSA_MODULES_TEMPLATE: PDSAModule[] = [
  {
    id: "pdsa-1", name: "Module 1 — Python Refresher",
    subtopics: makeSubs("pdsa1", ["Python Basics", "Functions", "Lists", "Dictionaries", "Sets", "File Handling"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-2", name: "Module 2 — Complexity Analysis",
    subtopics: makeSubs("pdsa2", ["Time Complexity", "Space Complexity", "Big-O", "Big-Omega", "Big-Theta", "Best / Average / Worst Case"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-3", name: "Module 3 — Sorting & Searching",
    subtopics: makeSubs("pdsa3", ["Linear Search", "Binary Search", "Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort", "Counting Sort", "Radix Sort"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-4", name: "Module 4 — Arrays & Basic Data Structures",
    subtopics: makeSubs("pdsa4", ["Arrays", "Prefix Sum", "Sliding Window", "Two Pointers", "Hash Maps", "Hash Sets", "Stacks", "Queues", "Deques"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-5", name: "Module 5 — Graph Algorithms I",
    subtopics: makeSubs("pdsa5", ["Graph Representation", "BFS", "DFS", "Connected Components", "Cycle Detection", "Bipartite Graph"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-6", name: "Module 6 — Graph Algorithms II",
    subtopics: makeSubs("pdsa6", ["Topological Sort", "Shortest Path", "Dijkstra", "Bellman Ford", "Floyd Warshall", "Minimum Spanning Tree", "Prim", "Kruskal"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-7", name: "Module 7 — Trees & Advanced DS",
    subtopics: makeSubs("pdsa7", ["Heap", "Priority Queue", "Binary Search Tree", "AVL Trees", "Balanced Trees", "Union Find (DSU)"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-8", name: "Module 8 — Greedy Algorithms",
    subtopics: makeSubs("pdsa8", ["Greedy Strategy", "Activity Selection", "Huffman Coding", "Fractional Knapsack"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-9", name: "Module 9 — Divide & Conquer",
    subtopics: makeSubs("pdsa9", ["Divide & Conquer Strategy", "Master Theorem", "Closest Pair", "Strassen's Matrix Multiplication"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-10", name: "Module 10 — Dynamic Programming",
    subtopics: makeSubs("pdsa10", ["Memoization", "Tabulation", "1D DP", "2D DP", "Knapsack", "LIS", "Matrix DP"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-11", name: "Module 11 — String Algorithms",
    subtopics: makeSubs("pdsa11", ["KMP", "Rabin Karp", "Trie", "Pattern Matching"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
  {
    id: "pdsa-12", name: "Module 12 — Advanced Topics",
    subtopics: makeSubs("pdsa12", ["Network Flow", "Linear Programming", "Complexity Classes"]),
    completionPercent: 0, leetcodeProblems: 0, codeforcesProblems: 0, revisionCount: 0, confidence: 0, notes: "",
  },
];

// ── Track 2: MLF IITM ──────────────────────────────────────────

export const MLF_WEEKS_TEMPLATE: MLFWeek[] = [
  { id: "mlf-1", weekNumber: 1, title: "Introduction to Machine Learning", subtopics: [{ id: "mlfs-1", name: "Intro to ML" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-2", weekNumber: 2, title: "Calculus", subtopics: [{ id: "mlfs-2a", name: "Differentiation" }, { id: "mlfs-2b", name: "Gradients" }, { id: "mlfs-2c", name: "Chain Rule" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-3", weekNumber: 3, title: "Linear Algebra", subtopics: [{ id: "mlfs-3a", name: "Vectors" }, { id: "mlfs-3b", name: "Matrices" }, { id: "mlfs-3c", name: "Least Squares Regression" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-4", weekNumber: 4, title: "Eigenvalues & Eigenvectors", subtopics: [{ id: "mlfs-4", name: "Eigenvalues & Eigenvectors" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-5", weekNumber: 5, title: "Symmetric Matrices", subtopics: [{ id: "mlfs-5", name: "Symmetric Matrices" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-6", weekNumber: 6, title: "SVD & PCA", subtopics: [{ id: "mlfs-6a", name: "SVD" }, { id: "mlfs-6b", name: "Principal Component Analysis (PCA)" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-7", weekNumber: 7, title: "Unconstrained Optimization", subtopics: [{ id: "mlfs-7a", name: "Gradient Descent" }, { id: "mlfs-7b", name: "Cost Functions" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-8", weekNumber: 8, title: "Convex Optimization", subtopics: [{ id: "mlfs-8a", name: "Convex Sets" }, { id: "mlfs-8b", name: "Convex Functions" }, { id: "mlfs-8c", name: "Convex Optimization" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-9", weekNumber: 9, title: "Constrained Optimization", subtopics: [{ id: "mlfs-9a", name: "Constrained Optimization" }, { id: "mlfs-9b", name: "Lagrange Multipliers" }, { id: "mlfs-9c", name: "Logistic Regression as Optimization" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-10", weekNumber: 10, title: "Probabilistic Models", subtopics: [{ id: "mlfs-10", name: "Probabilistic Models" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-11", weekNumber: 11, title: "Exponential Family", subtopics: [{ id: "mlfs-11", name: "Exponential Family" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
  { id: "mlf-12", weekNumber: 12, title: "Parameter Estimation & EM", subtopics: [{ id: "mlfs-12a", name: "Parameter Estimation" }, { id: "mlfs-12b", name: "Expectation Maximization (EM)" }], lectureProgress: 0, notesCompleted: false, implementationDone: false, revisionDone: false, confidence: 0 },
];

// ── Track 3: ML Journey ─────────────────────────────────────────

function makeMLItems(prefix: string, names: string[]): import("./types").MLJourneyItem[] {
  return names.map(n => ({ id: uid(prefix), name: n, implemented: false, revised: false, projectUsed: false, blogRead: false, paperRead: false }));
}

export const ML_JOURNEY_TEMPLATE: MLJourneySection[] = [
  { id: "mlj-1", name: "Foundations", items: makeMLItems("mlj1", ["Data Cleaning", "Feature Engineering", "Train/Test Split", "Cross Validation", "Evaluation Metrics"]) },
  { id: "mlj-2", name: "Supervised Learning", items: makeMLItems("mlj2", ["Linear Regression", "Ridge Regression", "Lasso Regression", "Logistic Regression", "Naive Bayes", "KNN", "Decision Trees", "Random Forest", "Bagging", "AdaBoost", "Gradient Boosting", "XGBoost", "Support Vector Machines"]) },
  { id: "mlj-3", name: "Unsupervised Learning", items: makeMLItems("mlj3", ["KMeans", "Hierarchical Clustering", "DBSCAN", "PCA", "Dimensionality Reduction"]) },
  { id: "mlj-4", name: "Deep Learning Preparation", items: makeMLItems("mlj4", ["PyTorch Basics", "Tensor Operations", "Neural Networks", "Training Loop"]) },
  { id: "mlj-5", name: "NLP", items: makeMLItems("mlj5", ["Text Vectorization", "Word Embeddings", "Sentence Transformers"]) },
  { id: "mlj-6", name: "Recommendation Systems", items: makeMLItems("mlj6", ["Content Based", "Collaborative Filtering", "Matrix Factorization", "Session Based Recommendation", "Retrieval", "Ranking"]) },
  { id: "mlj-7", name: "MLOps Basics", items: makeMLItems("mlj7", ["Git", "Virtual Environments", "Experiment Tracking", "Model Deployment"]) },
];

// ── Track 4: Incubator ──────────────────────────────────────────

function makeIncTasks(prefix: string, names: string[]): import("./types").IncubatorTask[] {
  return names.map(n => ({ id: uid(prefix), name: n, completed: false }));
}

export const INCUBATOR_PHASES_TEMPLATE: IncubatorPhase[] = [
  { id: "inc-1", name: "Phase 1 — Project Understanding", tasks: makeIncTasks("inc1", ["PRD", "Research Papers", "Problem Statement"]), completionPercent: 0 },
  { id: "inc-2", name: "Phase 2 — Dataset", tasks: makeIncTasks("inc2", ["Download", "Exploration", "Cleaning", "Session Analysis"]), completionPercent: 0 },
  { id: "inc-3", name: "Phase 3 — Baseline", tasks: makeIncTasks("inc3", ["Popular Recommendation", "Session Baseline", "Evaluation"]), completionPercent: 0 },
  { id: "inc-4", name: "Phase 4 — Intent Modeling", tasks: makeIncTasks("inc4", ["Query Understanding", "User Behavior", "Session Representation", "Intent Embeddings"]), completionPercent: 0 },
  { id: "inc-5", name: "Phase 5 — Retrieval", tasks: makeIncTasks("inc5", ["Sentence Transformers", "Embeddings", "FAISS"]), completionPercent: 0 },
  { id: "inc-6", name: "Phase 6 — Ranking", tasks: makeIncTasks("inc6", ["Feature Engineering", "Intent-aware Ranking"]), completionPercent: 0 },
  { id: "inc-7", name: "Phase 7 — Evaluation", tasks: makeIncTasks("inc7", ["Recall@K", "MRR", "Diversity", "Novelty"]), completionPercent: 0 },
  { id: "inc-8", name: "Phase 8 — Deployment", tasks: makeIncTasks("inc8", ["FastAPI", "Streamlit", "Documentation", "Demo"]), completionPercent: 0 },
];

// ── Track 5: DBMS ───────────────────────────────────────────────

export const DBMS_MODULES_TEMPLATE: DBMSModule[] = [
  { id: "dbms-1", name: "SQL Basics", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-2", name: "Advanced SQL", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-3", name: "Relational Algebra", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-4", name: "Database Design", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-5", name: "Functional Dependencies", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-6", name: "Normalization", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-7", name: "Application Development", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-8", name: "Storage Management", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-9", name: "Indexing", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-10", name: "Hashing", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-11", name: "Transactions", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-12", name: "Backup & Recovery", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
  { id: "dbms-13", name: "Query Optimization", lectureDone: false, revisionDone: false, sqlPracticeDone: false },
];

// ── Track 6: MAD I ──────────────────────────────────────────────

export const MAD_MODULES_TEMPLATE: MADModule[] = [
  { id: "mad-1", name: "HTML", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-2", name: "CSS", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-3", name: "MVC", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-4", name: "Databases", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-5", name: "Controllers", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-6", name: "REST APIs", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-7", name: "Backend Systems", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-8", name: "Frontend", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-9", name: "Security", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-10", name: "Testing", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-11", name: "HTML Evolution", lectureDone: false, assignmentDone: false, projectProgress: 0 },
  { id: "mad-12", name: "Deployment", lectureDone: false, assignmentDone: false, projectProgress: 0 },
];

// ── XP ──────────────────────────────────────────────────────────

export const XP_LEVEL_THRESHOLDS = [0, 200, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000, 13000, 16500, 20500, 25000, 30000];
export const XP_LEVEL_TITLES = [
  "Curious Fresher",
  "Consistent Learner",
  "Problem Solver",
  "Code Warrior",
  "Algorithm Explorer",
  "Builder",
  "ML Apprentice",
  "ML Engineer",
  "System Builder",
  "Tensor Titan",
  "AI Craftsman",
  "Internship Hunter",
  "Offer Magnet",
  "Research Explorer",
  "Elite Engineer"
];
