import { Hono } from "hono";

const progressRouter = new Hono();

progressRouter.get("/", async (c) => {
  const { results } =
    await c.env.prod_d1_offline_learning_progress
      .prepare("SELECT * FROM Progress")
      .run();
  return Response.json(results);
});

progressRouter.post("/", async (c) => {
  const progress = await c.req.json();
  const { results } =
    await c.env.prod_d1_offline_learning_progress
      .prepare(
        "INSERT INTO Progress (Id, UserId, Type, LessonId, Score, Total, Timestamp, Synced) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        progress.id,
        progress.userId,
        progress.type,
        progress?.lessonId || null,
        progress?.score || null,
        progress?.total || null,
        progress.timestamp,
        progress.synced
      )
      .run();
  console.log(progress);
  return c.text(results);
});

export default progressRouter;
