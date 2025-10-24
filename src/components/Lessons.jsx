import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { useAppStore } from "../store/useAppStore";

export default function Lessons() {
  const { lessons, completedLessons, completeLesson } =
    useAppStore();

  const handleCompleteLesson = (lessonId) => {
    completeLesson(lessonId);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Available Lessons
      </Typography>
      {lessons.map((lesson) => {
        const isCompleted = completedLessons.includes(
          lesson.id
        );
        return (
          <Card key={lesson.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h6">
                    {lesson.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {lesson.description}
                  </Typography>
                </Box>
                {isCompleted ? (
                  <Chip label="Completed" color="success" />
                ) : (
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleCompleteLesson(lesson.id)
                    }
                  >
                    Mark Complete
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
