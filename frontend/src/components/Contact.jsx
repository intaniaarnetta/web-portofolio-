import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaCheckCircle,
  FaPaperPlane,
  FaHeart,
} from "react-icons/fa";
import smkLogo from "../assets/smk.webp";
import sarastyaLogo from "../assets/sti.webp";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative transition-colors duration-500 bg-[var(--bg)] text-[var(--text)]"
    >
      {/* ✨ Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <FaPaperPlane className="text-sky-600 text-4xl dark:text-sky-400" />
          <h2 className="text-4xl md:text-5xl font-bold text-sky-600 dark:text-sky-400">
            Get In Touch
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
          Have a project in mind or just want to say hi?  
          Feel free to reach out — I’d love to hear from you!
        </p>
      </motion.div>

      {/* 💬 Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl shadow-lg rounded-2xl p-8 md:p-8 w-full max-w-md border border-sky-100 dark:border-sky-900 relative"
      >
        <div className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-sky-400 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-sky-400 transition"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-sky-400 transition resize-none"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 bg-sky-500 dark:bg-sky-600 text-white font-medium py-3 rounded-xl shadow-md hover:bg-sky-600 dark:hover:bg-sky-700 transition"
          >
            <FaPaperPlane />
            Send Message
          </motion.button>
        </div>

        {/* 🎉 Notifikasi Sukses */}
        <AnimatePresence>
          {isSent && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-medium text-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-2 border border-green-400 drop-shadow-xl"
            >
              <FaCheckCircle className="text-white text-lg" />
              Message sent successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {/* 🌐 Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex gap-8 text-sky-600 dark:text-sky-400 text-3xl mt-12"
      >
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-sky-800 dark:hover:text-sky-300 transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-sky-800 dark:hover:text-sky-300 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="mailto:intania@example.com"
          className="hover:text-sky-800 dark:hover:text-sky-300 transition"
        >
          <FaEnvelope />
        </a>
      </motion.div>

      {/* 🌸 Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-sky-200 dark:border-sky-900 pt-6 mt-12 text-center w-full max-w-2xl flex flex-col items-center gap-2"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-sky-600 dark:text-sky-400">Intania Arnetta</span>
          <FaHeart className="text-red-500" />
          All rights reserved
        </p>

        <div className="flex items-center justify-center gap-4 mt-2">
          <img src={smkLogo} alt="SMK Logo" className="h-6 md:h-8 object-contain" />
          <img src={sarastyaLogo} alt="Sarastya Logo" className="h-6 md:h-8 object-contain" />
        </div>
      </motion.div>
    </section>
  );
}
