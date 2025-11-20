// @ts-nocheck
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Navbar from "./Navbar";

// 🔹 Import logo
import reactLogo from "../assets/react.webp";
import csharpLogo from "../assets/csharp.webp";
import postgresLogo from "../assets/postgresql.webp";
import keycloakLogo from "../assets/keycloak.webp";
import githubLogo from "../assets/github.webp";
import figmaLogo from "../assets/figma.webp";
import instagramLogo from "../assets/instagram.webp";

// 🔹 Import dokumentasi PKL
import doc1 from "../assets/agustus.jpg";
import doc2 from "../assets/pembekalan.jpg";
import doc3 from "../assets/stisba.jpg";

const logos = [
  { src: reactLogo, x: "-45vw", y: "-25vh" },
  { src: csharpLogo, x: "45vw", y: "-30vh" },
  { src: postgresLogo, x: "-40vw", y: "10vh" },
  { src: keycloakLogo, x: "40vw", y: "15vh" },
  { src: githubLogo, x: "-30vw", y: "30vh" },
  { src: figmaLogo, x: "0vw", y: "-40vh" },
  { src: instagramLogo, x: "35vw", y: "30vh" },
];

const slides = [
  {
    title: "About Me",
    content: (
      <p className="leading-relaxed max-w-3xl mx-auto text-justify md:text-center 
                    text-gray-200 text-sm sm:text-base md:text-lg">
        Halo! Saya{" "}
        <span className="font-semibold text-sky-400">Intania Arnetta</span>, siswi kelas XII jurusan{" "}
        <span className="font-semibold text-sky-400">Rekayasa Perangkat Lunak (RPL)</span> yang sedang
        melaksanakan Praktik Kerja Lapangan di{" "}
        <span className="font-semibold text-sky-400">Sarastya Technology</span>. Selama PKL, saya banyak
        belajar tentang{" "}
        <span className="text-sky-400 font-medium">
          pengembangan aplikasi web modern, integrasi API, dan desain antarmuka pengguna
        </span>{" "}
        menggunakan teknologi seperti React, C#, dan PostgreSQL. Saya juga terlibat dalam beberapa proyek
        internal yang membantu saya memahami bagaimana proses kerja tim IT profesional berlangsung.
        <br />
        <br />
        Saya memiliki minat besar pada{" "}
        <span className="text-sky-400 font-medium">pengembangan web</span> dan{" "}
        <span className="text-sky-400 font-medium">analisis data</span>, serta ingin terus mengasah kemampuan
        saya untuk menciptakan solusi digital yang inovatif dan bermanfaat.
      </p>
    ),
  },
  {
    title: "Development Tools",
    content: (
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-6">
        {[
          { name: "React", icon: reactLogo, desc: "Frontend web interaktif" },
          { name: "C#", icon: csharpLogo, desc: "Backend & aplikasi desktop" },
          { name: "PostgreSQL", icon: postgresLogo, desc: "Manajemen basis data" },
          { name: "Keycloak", icon: keycloakLogo, desc: "Sistem autentikasi" },
          { name: "GitHub", icon: githubLogo, desc: "Version control" },
          { name: "Figma", icon: figmaLogo, desc: "Perancangan UI/UX" },
        ].map((tool, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-900 
                       border border-sky-700 rounded-2xl shadow-md w-28 sm:w-32 
                       transition-all duration-300"
          >
            <img src={tool.icon} alt={tool.name} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            <span className="font-semibold text-xs sm:text-sm text-center text-gray-200">
              {tool.name}
            </span>
            <span className="text-[10px] sm:text-xs text-center text-gray-400">
              {tool.desc}
            </span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    title: "Documentation",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mt-6">
        {[doc1, doc2, doc3].map((doc, i) => (
          <motion.img
            key={i}
            whileHover={{ scale: 1.05 }}
            src={doc}
            alt={`Dokumentasi ${i + 1}`}
            className="w-full h-36 sm:h-44 object-cover rounded-xl shadow-lg border border-sky-700"
          />
        ))}
      </div>
    ),
  },
];

export default function About() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      id="about"
      className="
        relative min-h-screen flex flex-col items-center justify-center overflow-hidden 
        transition-colors duration-500 pt-[100px]
        bg-gray-900
      "
    >
      <Navbar />

      {/* ✨ Floating logos — otomatis hilang di mobile */}
      {logos.map((logo, i) => (
        <motion.img
          key={i}
          src={logo.src}
          alt="floating logo"
          initial={{ x: logo.x, y: logo.y, opacity: 0.6 }}
          animate={{
            y: [logo.y, `${parseFloat(logo.y) + (i % 2 === 0 ? 8 : -8)}vh`, logo.y],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="hidden md:block absolute w-16 h-16 md:w-24 md:h-24 object-contain opacity-60 pointer-events-none"
        />
      ))}

      {/* 🧭 Konten utama */}
      <div className="relative z-10 text-center px-4 md:px-0 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.7 }}
          >
            {/* Title responsif */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 
                           text-sky-400 drop-shadow-[0_0_15px_rgba(30,144,255,0.5)]">
              {slides[current].title}
            </h2>

            {/* Body text responsif */}
            <div className="text-sm sm:text-base md:text-xl mx-auto leading-relaxed">
              {slides[current].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 🔘 Navigasi */}
        <div className="mt-8 sm:mt-10 flex justify-center items-center gap-5 sm:gap-6">
          <button
            onClick={handlePrev}
            className="p-2 sm:p-3 bg-gray-800 border border-sky-700 
                       text-sky-400 rounded-full hover:bg-sky-700 hover:text-gray-100 shadow-sm transition-all"
          >
            <FaArrowLeft size={16} />
          </button>

          <div className="flex gap-2 sm:gap-3">
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  current === i ? "bg-sky-400" : "bg-gray-600"
                }`}
              ></span>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 sm:p-3 bg-gray-800 border border-sky-700 
                       text-sky-400 rounded-full hover:bg-sky-700 hover:text-gray-100 shadow-sm transition-all"
          >
            <FaArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
