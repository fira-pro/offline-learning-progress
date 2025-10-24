import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { sampleLessons } from "./data/lessons";
import { generateMathQuestion } from "./data/questions";

import { useAppStore } from "./store/useAppStore";
import { initDB } from "./utils/idb";
import SelectUser from "./components/SelectUser";
import SyncMessage from "./components/SyncMessage";
import WelcomeBoard from "./components/WelcomeBoard";
import Lessons from "./components/Lessons";
import QuizOverview from "./components/QuizOverview";
import QuizScreen from "./components/QuizScreen";
import QuizResultDialog from "./components/QuizResultDialog";

function App() {
  const {
    currentUser,
    loadUsers,
    loadUserProgress,
    setOnline,
    syncData,
  } = useAppStore();

  // const [showUserDialog, setShowUserDialog] =
  //   useState(true);
  const [activeTab, setActiveTab] = useState("lessons");
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] =
    useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);
  const [selectedAnswer, setSelectedAnswer] =
    useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] =
    useState(false);

  useEffect(() => {
    const init = async () => {
      await initDB();
      await loadUsers();

      // Pre-cache lessons in IndexedDB
      const db = await initDB();
      for (const lesson of sampleLessons) {
        await db.put("lessons", lesson);
      }

      // Generate and cache some quiz questions
      const cachedQuizzes = [];
      for (let i = 0; i < 10; i++) {
        const question = generateMathQuestion();
        cachedQuizzes.push(question);
        await db.put("quizzes", question);
      }
    };

    init();

    const handleOnline = () => {
      setOnline(true);
      syncData();
    };

    const handleOffline = () => {
      setOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [loadUsers, setOnline, syncData]);

  useEffect(() => {
    if (currentUser) {
      loadUserProgress(currentUser.id);
      // setShowUserDialog(false);
    }
  }, [currentUser, loadUserProgress]);

  const closeQuizResult = () => {
    setShowQuizResult(false);
  };

  if (!currentUser) {
    return <SelectUser />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <WelcomeBoard />

        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 3,
          }}
        >
          <Button
            onClick={() => setActiveTab("lessons")}
            sx={{
              mr: 2,
              fontWeight:
                activeTab === "lessons" ? "bold" : "normal",
            }}
          >
            Lessons
          </Button>
          <Button
            onClick={() => setActiveTab("quiz")}
            sx={{
              fontWeight:
                activeTab === "quiz" ? "bold" : "normal",
            }}
          >
            Quiz
          </Button>
        </Box>

        {activeTab === "lessons" && <Lessons />}

        {activeTab === "quiz" &&
          !isQuizActive &&
          !showQuizResult && (
            <QuizOverview
              setCurrentQuizQuestions={
                setCurrentQuizQuestions
              }
              setCurrentQuestionIndex={
                setCurrentQuestionIndex
              }
              setQuizScore={setQuizScore}
              setIsQuizActive={setIsQuizActive}
              setShowQuizResult={setShowQuizResult}
              setSelectedAnswer={setSelectedAnswer}
            />
          )}

        {isQuizActive && (
          <QuizScreen
            setCurrentQuestionIndex={
              setCurrentQuestionIndex
            }
            currentQuestionIndex={currentQuestionIndex}
            currentQuizQuestions={currentQuizQuestions}
            setQuizScore={setQuizScore}
            quizScore={quizScore}
            setSelectedAnswer={setSelectedAnswer}
            selectedAnswer={selectedAnswer}
            setShowQuizResult={setShowQuizResult}
            setIsQuizActive={setIsQuizActive}
          />
        )}

        {showQuizResult && (
          <QuizResultDialog
            showQuizResult={showQuizResult}
            closeQuizResult={closeQuizResult}
            currentQuizQuestions={currentQuizQuestions}
            quizScore={quizScore}
          />
        )}
      </Paper>

      <SyncMessage />
    </Container>
  );
}

export default App;
