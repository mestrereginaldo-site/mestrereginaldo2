import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";   // <-- caminho corrigido

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// registra todas as rotas /api/*
await registerRoutes(app);

// tratamento global de erros
app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// rota de saúde simples
app.get("/api/health", (_req, res) => res.json({ ok: true }));

export default app;
