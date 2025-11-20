// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.js";
import projectsRouter from "./routes/projects.js";
import settingsRouter from "./routes/settings.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static folder (supaya bisa akses gambar)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api", authRoutes); // 🔐 Login route
app.use("/api/projects", projectsRouter); // 📁 Projects route
app.use("/api/settings", settingsRouter); // ⚙️ Settings route

// Root route
app.get("/", (req, res) => {
  res.send("✅ Server is running with Auth + Projects + Settings");
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// frontend/src/pages/Login.jsx
// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

