import { Hono } from "hono";
import progressRouter from "./progress";
import usersRouter from "./users";

const app = new Hono();

app.route("/api/users", usersRouter);
app.route("/api/progress", progressRouter);

export default {
  fetch: app.fetch,
};
