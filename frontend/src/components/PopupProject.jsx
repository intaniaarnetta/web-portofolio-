// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PopupProjectAdd from "./PopupProjectAdd";
import axios from "axios";
import { API_BASE_URL, SERVER_BASE } from "../config/api";

export default function PopupProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("user");

  useEffect(() => {
    const storedRole = localStorage.getItem("role") || "user";
    setRole(storedRole);
    fetchProjectDetail();
  }, [id]);

  const fetchProjectDetail = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error("Fetch project detail error:", err);
    } finally {
      setLoading(false);
    }
  };

  const prevImage = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % project.images.length);

  const handleUpdate = (updatedProject) => {
    setProject(updatedProject);
    setEditVisible(false);
    setCurrentIndex(0);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${id}`);
      navigate("/home");
      setTimeout(() => {
        const section = document.getElementById("projects");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      console.error("Delete project error:", err);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-300">
        Loading project details...
      </section>
    );
  }

  if (!project) {
    return (
      <section className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center justify-center">
        <p className="text-center text-gray-400 text-lg">
          Project tidak ditemukan 😢
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg"
        >
          Kembali
        </button>
      </section>
    );
  }

  const images = project.images || [];

  return (
    <section className="min-h-screen bg-gray-900 text-gray-300 p-6 md:p-12 flex flex-col items-center">
      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 p-2 rounded-full bg-sky-900/30 hover:bg-sky-700/40 transition-colors"
      >
        <ArrowLeft size={22} className="text-sky-400" />
      </button>

      {/* Carousel gambar */}
      {images.length > 0 && (
        <div className="relative rounded-xl overflow-hidden shadow-lg mb-6 w-full max-w-4xl">
          <img
            src={`${SERVER_BASE}${images[currentIndex]}`}
            alt={project.title}
            className="w-full max-h-[90vh] object-contain bg-black rounded-md mx-auto"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
              >
                <ChevronLeft size={28} color="white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
              >
                <ChevronRight size={28} color="white" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      idx === currentIndex ? "bg-white" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Detail teks */}
      <h3 className="text-3xl md:text-4xl font-bold text-sky-400 mb-4">
        {project.title}
      </h3>
      <p className="text-gray-300 text-base md:text-lg mb-4 leading-relaxed">
        {project.description}
      </p>
      <p className="text-gray-400 text-sm md:text-base mb-6">
        Tools: {project.tools?.join(", ")}
      </p>

      {/* Tombol aksi (hanya untuk admin) */}
      {role === "admin" && (
        <div className="flex justify-center gap-6 mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setEditVisible(true)}
            className="flex items-center gap-2 text-sm md:text-base font-medium text-yellow-400 hover:text-yellow-300"
          >
            <Edit3 size={18} /> Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleDelete}
            className="flex items-center gap-2 text-sm md:text-base font-medium text-red-500 hover:text-red-400"
          >
            <Trash2 size={18} /> Delete
          </motion.button>
        </div>
      )}

      {/* Popup edit */}
      {editVisible && role === "admin" && (
        <PopupProjectAdd
          project={project}
          onClose={() => setEditVisible(false)}
          onUpdate={handleUpdate}
        />
      )}
    </section>
  );
}
