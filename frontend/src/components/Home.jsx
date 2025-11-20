// @ts-nocheck
import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLaptopCode,
  FaUserGraduate,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import intanPhoto from "../assets/intan.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 overflow-hidden px-5 md:px-12"
    >
      {/* ⚙️ ICON SETTING */}
      <motion.button
        onClick={() => navigate("/settings")}
        whileHover={{ scale: 1.1, rotate: 90 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="fixed top-6 right-6 z-[9999] text-sky-400 hover:text-sky-200 transition-all cursor-pointer"
      >
        <FaCog size={28} />
      </motion.button>

      {/* 🌈 Background blur */}
      <div className="absolute top-[-120px] right-[-120px] w-[300px] h-[300px] md:w-[350px] md:h-[350px] bg-sky-700 rounded-full blur-[130px] opacity-40"></div>
      <div className="absolute bottom-[-120px] left-[-120px] w-[300px] h-[300px] md:w-[350px] md:h-[350px] bg-cyan-700 rounded-full blur-[130px] opacity-40"></div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-12 py-20">
        
        {/* TEKS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-left space-y-5 md:space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-200">
            Halo, saya{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Intania Arnetta
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-gray-400 font-medium italic">
            Alumni Siswa PKL di Sarastya Technology
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
            Saya adalah siswi jurusan{" "}
            <span className="font-semibold text-sky-400">
              Rekayasa Perangkat Lunak (RPL)
            </span>{" "}
            yang telah melaksanakan Praktik Kerja Lapangan di{" "}
            <span className="font-semibold text-sky-400">
              Sarastya Technology
            </span>
            . Fokus saya adalah pengembangan aplikasi web modern berbasis fullstack
          </p>

          {/* INFO */}
          <div className="pt-3 flex flex-col gap-2 text-gray-400 text-sm md:text-base">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-sky-400" />
              Sarastya Technology Integrata, Indonesia
            </p>
            <p className="flex items-center gap-2">
              <FaUserGraduate className="text-sky-400" />
              Siswa Kelas XII | Jurusan RPL
            </p>
            <p className="flex items-center gap-2">
              <FaLaptopCode className="text-sky-400" />
              Sedang mempelajari React & C#
            </p>
          </div>
        </motion.div>

        {/* FOTO + SOSMED */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-5"
        >
          {/* FOTO */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-sky-700 to-cyan-700 rounded-full blur-2xl opacity-60 animate-pulse"></div>

            <img
              src={intanPhoto}
              alt="Intania Arnetta"
              className="relative w-60 h-60 md:w-[380px] md:h-[380px] rounded-full object-cover shadow-2xl border-4 border-gray-800"
            />
          </div>

          {/* ICON SOSMED */}
          <div className="flex gap-6 mt-4">
            <motion.a
              href="https://www.instagram.com/intaniarntta_"
              target="_blank"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-sky-400 hover:text-sky-200"
            >
              <FaInstagram size={26} />
            </motion.a>

            <motion.a
              href="https://github.com/intaniaarnetta"
              target="_blank"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-sky-400 hover:text-sky-200"
            >
              <FaGithub size={26} />
            </motion.a>

            <motion.a
              href="mailto:intaniaarnetarandusina@gmail.com"
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-sky-400 hover:text-sky-200"
            >
              <FaEnvelope size={26} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
