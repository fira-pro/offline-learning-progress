import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppStore } from "../store/useAppStore";
import Box from "@mui/material/Box";

export default function WelcomeBoard() {
  const {
    isOnline,
    isSyncing,
    currentUser,
    completedLessons,
    quizzes,
  } = useAppStore();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Learning Progress Tracker
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Chip
            label={isOnline ? "Online" : "Offline"}
            color={isOnline ? "success" : "warning"}
            size="small"
          />
          {isSyncing && <CircularProgress size={20} />}
        </Box>
      </Box>

      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: "#f5f5f5",
          borderRadius: 1,
        }}
      >
        <Typography variant="h6">
          Welcome, {currentUser.name}!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Completed Lessons: {completedLessons.length} |
          Quizzes Taken: {quizzes.length}
        </Typography>
      </Box>
    </>
  );
}
