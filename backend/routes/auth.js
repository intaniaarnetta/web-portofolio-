// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // pastikan pakai bcryptjs agar lebih kompatibel
import pool from "../db.js";

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// 🧑‍💼 AUTO CREATE ADMIN ACCOUNT (jika belum ada)
const createAdminIfNotExist = async () => {
  try {
    const checkAdmin = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      ["admin"]
    );
    if (checkAdmin.rows.length === 0) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await pool.query(
        "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)",
        ["admin", hashedPassword, "admin"]
      );
      console.log("✅ Admin account created (username: admin, password: admin123)");
    } else {
      console.log("ℹ️ Admin account already exists.");
    }
  } catch (err) {
    console.error("❌ Error creating admin account:", err);
  }
};
createAdminIfNotExist();

// 🧾 REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username dan password wajib diisi!" });

  try {
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    if (checkUser.rows.length)
      return res.status(400).json({ message: "Username sudah digunakan!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role",
      [username, hashedPassword, "user"]
    );

    res.status(201).json({
      message: "Registrasi berhasil!",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username dan password wajib diisi!" });

  try {
    const userQuery = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    const user = userQuery.rows[0];

    if (!user) return res.status(401).json({ message: "Username tidak ditemukan!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Password salah!" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login berhasil!",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

export default router;
