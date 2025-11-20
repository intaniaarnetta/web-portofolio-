// @ts-nocheck
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function PopupProjectAdd({ onClose, onCreate, onUpdate, project }) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [tools, setTools] = useState(project?.tools?.join(", ") || "");

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState(project?.images || []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
  };

  const removeNewImage = (idx) => setNewImages(prev => prev.filter((_, i) => i !== idx));
  const removeExistingImage = (idx) => setExistingImages(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tools", tools || "");
    newImages.forEach(img => formData.append("images", img));
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      const url = project ? `${API_BASE_URL}/api/projects/${project.id}` : `${API_BASE_URL}/api/projects`;
      const method = project ? "PUT" : "POST";
      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      project ? onUpdate(data) : onCreate(data);
      onClose();
    } catch (err) {
      console.error("PopupProjectAdd handleSubmit error:", err);
    }
  };

  return (
    <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-[#101735] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative space-y-4 text-gray-100"
      >
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-200">
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-sky-400 mb-4 text-center">
          {project ? "Edit Project" : "Add New Project"}
        </h3>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Project Title"
          required
          className="w-full border border-gray-600 bg-gray-800 p-3 rounded-xl text-gray-100"
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Project Description"
          rows="3"
          required
          className="w-full border border-gray-600 bg-gray-800 p-3 rounded-xl text-gray-100"
        />

        <input
          value={tools}
          onChange={e => setTools(e.target.value)}
          placeholder="Tools/Tech, comma separated"
          className="w-full border border-gray-600 bg-gray-800 p-3 rounded-xl text-gray-100"
        />

        <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-sky-400 transition">
          <label className="cursor-pointer w-full block">
            <input type="file" multiple onChange={handleFileChange} className="hidden" />
            {existingImages.length + newImages.length === 0 ? (
              <span className="text-gray-400">Click or drag images here (max 10)</span>
            ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {existingImages.map((img, idx) => (
                  <div key={`existing-${idx}`} className="relative bg-gray-700 px-2 py-1 rounded text-sm text-gray-100">
                    <span>{img.split("/").pop()}</span>
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {newImages.map((img, idx) => (
                  <div key={`new-${idx}`} className="relative bg-gray-700 px-2 py-1 rounded text-sm text-gray-100">
                    <span>{img.name}</span>
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-3 rounded-xl hover:bg-sky-600 transition"
        >
          {project ? "Update" : "Create"}
        </button>
      </motion.form>
    </motion.div>
  );
}
