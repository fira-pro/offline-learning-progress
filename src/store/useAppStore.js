import { create } from "zustand";
import axios from "axios";
import { sampleLessons } from "../data/lessons";
import { initDB } from "../utils/idb";

export const useAppStore = create((set, get) => ({
  currentUser: null,
  users: [],
  lessons: sampleLessons,
  completedLessons: [],
  quizzes: [],
  isOnline: navigator.onLine,
  isSyncing: false,
  syncMessage: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  setUsers: (users) => set({ users }),

  setCompletedLessons: (lessons) =>
    set({ completedLessons: lessons }),

  setQuizzes: (quizzes) => set({ quizzes }),

  setOnline: (status) => set({ isOnline: status }),

  setSyncing: (status) => set({ isSyncing: status }),

  setSyncMessage: (message) =>
    set({ syncMessage: message }),

  createUser: async (name) => {
    const db = await initDB();
    const user = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
    };

    await db.put("users", user);
    const users = await db.getAll("users");
    set({ users, currentUser: user });

    if (get().isOnline) {
      try {
        await axios.post("/api/users", user);
      } catch (error) {
        console.log("Failed to sync user to server", error);
      }
    }

    return user;
  },

  loadUsers: async () => {
    const db = await initDB();
    const users = await db.getAll("users");
    set({ users });
  },

  loadUserProgress: async (userId) => {
    const db = await initDB();
    const tx = db.transaction("progress", "readonly");
    const index = tx.store.index("userId");
    const allProgress = await index.getAll(userId);

    const completedLessonIds = allProgress
      .filter((p) => p.type === "lesson")
      .map((p) => p.lessonId);

    const quizResults = allProgress
      .filter((p) => p.type === "quiz")
      .map((p) => ({
        id: p.id,
        score: p.score,
        total: p.total,
        timestamp: p.timestamp,
      }));

    set({
      completedLessons: completedLessonIds,
      quizzes: quizResults,
    });
  },

  completeLesson: async (lessonId) => {
    const { currentUser, completedLessons } = get();
    if (!currentUser) return;

    const db = await initDB();
    const progress = {
      userId: currentUser.id,
      type: "lesson",
      lessonId,
      timestamp: new Date().toISOString(),
      synced: 0,
    };

    const _ = await db.add("progress", progress);
    set({
      completedLessons: [...completedLessons, lessonId],
    });

    if (get().isOnline) {
      get().syncData();
    }
  },

  submitQuiz: async (score, total) => {
    const { currentUser, quizzes } = get();
    if (!currentUser) return;

    const db = await initDB();
    const progress = {
      userId: currentUser.id,
      type: "quiz",
      score,
      total,
      timestamp: new Date().toISOString(),
      synced: 0,
    };

    const id = await db.add("progress", progress);
    const newQuiz = {
      id,
      score,
      total,
      timestamp: progress.timestamp,
    };
    set({ quizzes: [...quizzes, newQuiz] });

    if (get().isOnline) {
      get().syncData();
    }
  },

  syncData: async () => {
    const { isSyncing, isOnline } = get();
    if (isSyncing || !isOnline) return;

    set({ isSyncing: true });

    try {
      const db = await initDB();
      const tx = db.transaction("progress", "readonly");
      const index = tx.store.index("synced");
      const unsyncedProgress = await index.getAll(0);

      if (unsyncedProgress.length === 0) {
        set({ isSyncing: false });
        return;
      }

      for (const progress of unsyncedProgress) {
        try {
          await axios.post("/api/progress", {
            ...progress,
            synced: 1,
          });

          const writeTx = db.transaction(
            "progress",
            "readwrite"
          );
          await writeTx.store.put({
            ...progress,
            synced: 1,
          });
        } catch (error) {
          console.error(
            "Failed to sync progress item:",
            error
          );
        }
      }

      set({
        isSyncing: false,
        syncMessage: `Successfully synced ${unsyncedProgress.length} item(s)!`,
      });

      setTimeout(() => set({ syncMessage: null }), 3000);
    } catch (error) {
      console.error("Sync failed:", error);
      set({ isSyncing: false });
    }
  },
}));
