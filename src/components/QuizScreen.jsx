import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppStore } from "../store/useAppStore";

export default function QuizScreen({
  setCurrentQuestionIndex,
  currentQuestionIndex,
  currentQuizQuestions,
  setQuizScore,
  quizScore,
  setSelectedAnswer,
  selectedAnswer,
  setShowQuizResult,
  setIsQuizActive,
}) {
  const { submitQuiz } = useAppStore();

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion =
      currentQuizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setQuizScore(quizScore + 1);
    }

    if (
      currentQuestionIndex <
      currentQuizQuestions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore =
        selectedAnswer === currentQuestion.correctAnswer
          ? quizScore + 1
          : quizScore;
      submitQuiz(finalScore, currentQuizQuestions.length);
      setShowQuizResult(true);
      setIsQuizActive(false);
    }
  };
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Question {currentQuestionIndex + 1} of{" "}
        {currentQuizQuestions.length}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={
          ((currentQuestionIndex + 1) /
            currentQuizQuestions.length) *
          100
        }
        sx={{ mb: 3 }}
      />

      <Card sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center" }}
        >
          {
            currentQuizQuestions[currentQuestionIndex]
              .question
          }
        </Typography>

        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            value={selectedAnswer}
            onChange={(e) =>
              handleAnswerSelect(Number(e.target.value))
            }
          >
            {currentQuizQuestions[
              currentQuestionIndex
            ].options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option.toString()}
                sx={{
                  mb: 1,
                  p: 1,
                  border: "1px solid #ddd",
                  borderRadius: 1,
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleNextQuestion}
        disabled={selectedAnswer === null}
      >
        {currentQuestionIndex <
        currentQuizQuestions.length - 1
          ? "Next Question"
          : "Finish Quiz"}
      </Button>
    </Box>
  );
}
