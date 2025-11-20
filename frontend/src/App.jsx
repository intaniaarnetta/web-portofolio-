// @ts-nocheck
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Setting from "./components/Setting";
import PopupProject from "./components/PopupProject"; // ✅ sekarang ini halaman detail

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔹 Login Page */}
        <Route path="/" element={<Login />} />

        {/* 🔹 Register Page */}
        <Route path="/register" element={<Register />} />

        {/* 🔹 Home Page (gabungan beberapa section) */}
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <main>
                <Home />
                <About />
                <Projects />
                <Contact />
              </main>
            </>
          }
        />

        {/* 🔹 Projects Page */}
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Projects />
            </>
          }
        />

        {/* 🔹 Project Detail Page */}
        <Route
          path="/projects/:id"
          element={
            <>
              <PopupProject /> {/* ✅ nggak perlu props dummy */}
            </>
          }
        />

        {/* 🔹 Dashboard (Admin) */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <h1 className="text-center text-white mt-10 text-3xl">
                Selamat datang, Admin!
              </h1>
            </>
          }
        />

        {/* 🔹 Settings Page (tanpa Navbar) */}
        <Route
          path="/settings"
          element={
            <main>
              <Setting />
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
