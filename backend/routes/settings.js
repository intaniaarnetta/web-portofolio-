import express from "express";
import pool from "../db.js";
import { verifyToken } from "../middleware/auth.js";
import bcrypt from "bcryptjs"; // ✅ import statis

const router = express.Router();

// Route update user
router.put("/update-user", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, password } = req.body;

    if (!username && !password) {
      return res.status(400).json({ message: "Isi username baru atau password baru!" });
    }

    const userQuery = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    const currentUser = userQuery.rows[0];
    const newUsername = username || currentUser.username;

    let hashedPassword = currentUser.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await pool.query(
      `UPDATE users
       SET username = $1, password = $2, updated_at = NOW()
       WHERE id = $3
       RETURNING id, username, role`,
      [newUsername, hashedPassword, userId]
    );

    res.status(200).json({
      message: "User berhasil diperbarui!",
      ...updatedUser.rows[0],
    });
  } catch (err) {
    console.error("Error updating user:", err); // lihat ini di terminal
    res.status(500).json({ message: "Gagal memperbarui data user!" });
  }
});

export default router;
