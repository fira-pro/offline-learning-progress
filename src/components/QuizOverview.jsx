import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { generateMathQuestion } from "../data/questions";
import { useAppStore } from "../store/useAppStore";
import CardContent from '@mui/material/CardContent';
export default function QuizOverview({
  setCurrentQuizQuestions,
  setCurrentQuestionIndex,
  setQuizScore,
  setIsQuizActive,
  setShowQuizResult,
  setSelectedAnswer,
}) {
  const { quizzes } = useAppStore();

  const startQuiz = () => {
    const questions = Array.from({ length: 3 }, () =>
      generateMathQuestion()
    );
    setCurrentQuizQuestions(questions);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setIsQuizActive(true);
    setShowQuizResult(false);
    setSelectedAnswer(null);
  };
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Math Quiz
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Test your math skills with 3 random questions!
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={startQuiz}
      >
        Start Quiz
      </Button>

      {quizzes.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Previous Attempts
          </Typography>
          {quizzes
            .slice()
            .reverse()
            .map((quiz) => (
              <Card key={quiz.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body1">
                    Score: {quiz.score}/{quiz.total}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {new Date(
                      quiz.timestamp
                    ).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      )}
    </Box>
  );
}
