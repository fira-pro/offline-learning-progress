import { Hono } from "hono";

const usersRouter = new Hono();

usersRouter.get("/", async (c) => {
  const { results } =
    await c.env.prod_d1_offline_learning_progress
      .prepare("SELECT * FROM Progress")
      .run();
  return Response.json(results);
});

usersRouter.post("/", async (c) => {
  const user = await c.req.json();
  const { results } =
    await c.env.prod_d1_offline_learning_progress
      .prepare(
        "INSERT INTO Users (Id, Name, CreatedAt) VALUES (?, ?, ?)"
      )
      .bind(user.id, user.name, user.createdAt)
      .run();
  console.log(user);
  return c.text(results);
});

export default usersRouter;
