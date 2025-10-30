import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

await registerRoutes(app);

app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

export default app;
