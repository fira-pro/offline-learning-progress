import { openDB } from "idb";

// IndexedDB Setup
const DB_NAME = "OfflineLearningDB";
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("progress")) {
        const progressStore = db.createObjectStore(
          "progress",
          { keyPath: "id", autoIncrement: true }
        );
        progressStore.createIndex("userId", "userId");
        progressStore.createIndex("synced", "synced");
      }
      if (!db.objectStoreNames.contains("lessons")) {
        db.createObjectStore("lessons", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("quizzes")) {
        db.createObjectStore("quizzes", { keyPath: "id" });
      }
    },
  });
};
