// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { motion } from "framer-motion";
import { LogOut, User, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Setting() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!newUsername && !newPassword) {
      setMessage("Isi username baru atau password baru!");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/settings/update-user`,
        {
          username: newUsername || username,
          password: newPassword || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.username) {
        localStorage.setItem("username", response.data.username);
        setUsername(response.data.username);
      }

      setMessage(response.data.message || "Perubahan berhasil disimpan!");
      setNewUsername("");
      setNewPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Gagal memperbarui data!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-700 rounded-full blur-[150px] opacity-40"></div>
      <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-sky-700 rounded-full blur-[150px] opacity-40"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
          relative z-10 
          w-[90%] max-w-[430px]
          bg-gray-800/90 backdrop-blur-xl 
          border border-gray-700 
          rounded-3xl shadow-2xl 
          p-6 md:p-10 
          flex flex-col items-center
        "
      >

        {/* Header */}
        <div className="w-full flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <ArrowLeft size={22} className="text-white" />
          </button>

          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            Pengaturan Akun
          </h2>
        </div>

        <p className="text-gray-300 text-xs md:text-sm mb-6 text-center">
          Ubah username atau password Anda di sini
        </p>

        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.includes("berhasil") ? "text-green-400" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleUpdate} className="w-full flex flex-col gap-4">
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={`Username: ${username}`}
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="
                w-full pl-12 pr-4 py-3 
                border-2 border-gray-600 
                rounded-xl bg-gray-900 text-white 
                placeholder-gray-400 
                focus:outline-none focus:border-blue-500
                text-sm md:text-base
              "
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password baru"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="
                w-full pl-12 pr-12 py-3 
                border-2 border-gray-600 
                rounded-xl bg-gray-900 text-white 
                placeholder-gray-400 
                focus:outline-none focus:border-blue-500
                text-sm md:text-base
              "
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="
              w-full py-3 md:py-4 
              bg-gradient-to-r from-blue-600 to-sky-500 
              text-white rounded-xl shadow-lg 
              hover:scale-105 transition-transform 
              font-semibold text-base md:text-lg
            "
          >
            Simpan Perubahan
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="
            mt-6 md:mt-8 
            flex items-center gap-2 
            text-red-500 font-semibold hover:text-red-400 
            transition-colors text-sm md:text-base
          "
        >
          <LogOut size={18} /> Logout
        </button>
      </motion.div>
    </section>
  );
}
