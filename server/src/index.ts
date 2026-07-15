import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 👇 ADD THIS
app.use("/api/auth", authRoutes);

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