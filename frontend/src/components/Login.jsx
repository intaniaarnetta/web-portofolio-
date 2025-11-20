// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { Eye, EyeOff, User, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username dan password wajib diisi!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username);

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Username atau password salah!");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden px-4">
      {/* Background blur */}
      <div className="absolute top-[-120px] right-[-120px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-blue-700 rounded-full blur-[140px] opacity-40"></div>
      <div className="absolute bottom-[-120px] left-[-120px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-sky-700 rounded-full blur-[140px] opacity-40"></div>

      {/* LOGIN CARD */}
      <form
        onSubmit={handleLogin}
        className="
          relative z-10 bg-gray-800/90 backdrop-blur-xl border border-gray-700 
          rounded-3xl shadow-2xl 
          w-full max-w-[430px] 
          p-8 sm:p-12 
          flex flex-col items-center
        "
      >
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 text-center">
          Login ke Aplikasi
        </h2>

        <p className="text-gray-300 text-sm sm:text-base mb-7 text-center">
          Masukkan username dan password Anda untuk masuk
        </p>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        {/* Username */}
        <div className="relative w-full mb-4">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full pl-12 pr-4 py-3 sm:py-4 
              border-2 border-gray-600 rounded-xl 
              bg-gray-900 text-white placeholder-gray-400 
              focus:outline-none focus:border-blue-500 
              shadow-sm transition-all
            "
          />
        </div>

        {/* Password */}
        <div className="relative w-full mb-6">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full pl-12 pr-12 py-3 sm:py-4 
              border-2 border-gray-600 rounded-xl 
              bg-gray-900 text-white placeholder-gray-400 
              focus:outline-none focus:border-blue-500 
              shadow-sm transition-all
            "
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Tombol Login */}
        <button
          type="submit"
          className="
            w-full py-3 sm:py-4 
            bg-gradient-to-r from-blue-600 to-sky-500 
            text-white rounded-xl shadow-lg 
            hover:scale-105 transition-transform 
            font-semibold text-base sm:text-lg
          "
        >
          Login
        </button>

        <p className="text-gray-300 text-sm mt-6 text-center">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-400 font-medium hover:underline hover:text-blue-300"
          >
            Daftar sekarang
          </Link>
        </p>
      </form>
    </section>
  );
}
