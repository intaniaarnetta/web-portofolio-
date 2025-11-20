// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { Eye, EyeOff, User, Lock } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password || !confirmPassword) {
      setError("Semua field wajib diisi!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/register`, {
        username,
        password,
      });

      setSuccess("Registrasi berhasil! Mengarahkan ke login...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal!");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden px-4">
      {/* Background blur */}
      <div className="absolute top-[-150px] right-[-150px] w-[450px] h-[450px] bg-blue-700 rounded-full blur-[150px] opacity-40"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[450px] h-[450px] bg-sky-700 rounded-full blur-[150px] opacity-40"></div>

      {/* REGISTER CARD */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-[430px] md:max-w-[480px] bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl p-10 md:p-12 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Daftar Akun Baru
        </h2>
        <p className="text-gray-300 text-sm md:text-base mb-8 text-center">
          Buat akun untuk mulai menggunakan aplikasi
        </p>

        {/* Error / Success */}
        {error && (
          <p className="text-red-500 mb-4 font-medium text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-400 mb-4 font-medium text-center">
            {success}
          </p>
        )}

        {/* Username */}
        <div className="relative w-full mb-4">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-600 rounded-xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        {/* Password */}
        <div className="relative w-full mb-4">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-4 border-2 border-gray-600 rounded-xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Konfirmasi Password */}
        <div className="relative w-full mb-6">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Konfirmasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-12 pr-12 py-4 border-2 border-gray-600 rounded-xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Tombol Register */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold text-lg"
        >
          Register
        </button>

        {/* Link ke Login */}
        <p className="text-gray-300 text-sm mt-6">
          Sudah punya akun?
          <Link
            to="/"
            className="text-blue-400 font-medium hover:underline ml-1"
          >
            Login di sini
          </Link>
        </p>
      </form>
    </section>
  );
}
