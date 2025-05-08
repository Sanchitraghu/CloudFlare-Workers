import { Hono } from "hono";
import { cors } from "hono/cors";
import { blogRoutes, userRoute } from "./routes";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoutes);

app.get("/", (c) => {
  return c.json({ message: "Welcome to the most viewed blog website!!" });
});

export default app;
