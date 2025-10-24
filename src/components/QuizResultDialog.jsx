import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function QuizResultDialog({
  showQuizResult,
  closeQuizResult,
  currentQuizQuestions,
  quizScore,
}) {
  return (
    <Dialog open={showQuizResult} onClose={closeQuizResult}>
      <DialogTitle>Quiz Completed!</DialogTitle>
      <DialogContent>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", my: 2 }}
        >
          {quizScore}/{currentQuizQuestions.length}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          {quizScore === currentQuizQuestions.length
            ? "Perfect score! Excellent work!"
            : quizScore >= currentQuizQuestions.length / 2
            ? "Good job! Keep practicing!"
            : "Keep trying! Practice makes perfect!"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeQuizResult}
          variant="contained"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
