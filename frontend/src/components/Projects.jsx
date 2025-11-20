// @ts-nocheck
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PopupProjectAdd from "../components/PopupProjectAdd";
import axios from "axios";
import { API_BASE_URL, SERVER_BASE } from "../config/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [addPopupVisible, setAddPopupVisible] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "user";
    setRole(storedRole);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      const sorted = (res.data || []).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setProjects(sorted);
    } catch (err) {
      console.error("Fetch projects error:", err);
    }
  };

  const handleAddProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-[100px] text-gray-100 bg-gray-900 pb-20 overflow-hidden">
      <Navbar />

      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950"
        style={{ backgroundSize: "200% 200%", zIndex: 0 }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-12 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-100">
          My <span className="text-sky-400">Projects</span>
        </h2>

        {role === "admin" && (
          <button
            onClick={() => setAddPopupVisible(true)}
            className="mt-6 px-5 py-3 bg-sky-500 text-white rounded-xl shadow-lg hover:bg-sky-600 transition flex items-center gap-2 mx-auto"
          >
            Add New Project
          </button>
        )}
      </div>

      {/* Project Scroll Section */}
      <div
        className="
          relative z-10 flex gap-8 px-8 w-full max-w-[95vw] overflow-x-auto pb-6
          scrollbar-thin scrollbar-thumb-sky-600 scrollbar-track-gray-800

          /* --- MOBILE RESPONSIVE START --- */
          sm:gap-8 gap-4 
        "
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="
              bg-[#11172e]/80 backdrop-blur-xl border border-gray-700 rounded-2xl 
              shadow-lg hover:shadow-2xl transition-all overflow-hidden group 
              flex-shrink-0

              /* Desktop tetap 360px */
              w-[360px]

              /* Mobile card lebih kecil */
              sm:w-[360px] 
              w-[260px]
            "
          >
            {/* Image */}
            <div className="relative h-52 sm:h-52 h-40 overflow-hidden">
              <img
                src={
                  project.images?.[0]
                    ? `${SERVER_BASE}${project.images[0]}`
                    : "/fallback.jpg"
                }
                alt={project.title}
                className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-100 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm mt-3 line-clamp-2">
                {project.description}
              </p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="px-5 py-2 bg-sky-500 text-white rounded-lg text-sm hover:bg-sky-600 transition"
                >
                  Detail
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {projects.length === 0 && (
          <p className="text-center text-gray-400 text-lg w-full">
            Project tidak ditemukan 😢
          </p>
        )}
      </div>

      {addPopupVisible && role === "admin" && (
        <PopupProjectAdd
          onClose={() => setAddPopupVisible(false)}
          onCreate={handleAddProject}
        />
      )}
    </section>
  );
}
