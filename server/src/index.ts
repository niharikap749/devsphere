import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import aiRoutes from "./ai/ai.routes"; // 👈 Add this

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/ai", aiRoutes); // 👈 Add this

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "DevSphere API is running 🚀",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});