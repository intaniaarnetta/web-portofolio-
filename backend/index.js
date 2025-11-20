import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

// Import semua route
import projectsRouter from "./routes/projects.js";
import settingsRouter from "./routes/settings.js";
import authRoutes from "./routes/auth.js"; // ✅ tambahkan ini

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve folder uploads supaya gambar bisa diakses
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// 🔐 Route login
app.use("/api", authRoutes); // ✅ ini penting

// Routes lainnya
app.use("/api/projects", projectsRouter);
app.use("/api/settings", settingsRouter);

// Root check
app.get("/", (req, res) => {
  res.send("✅ Server is running with Auth, Projects, and Settings");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
