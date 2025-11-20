import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

export default function Navbar() {
  const menuItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 flex justify-center z-50"
    >
      <div
        className="
          flex items-center justify-center gap-6 md:gap-12
          bg-white/80 dark:bg-black/80 backdrop-blur-lg
          border border-sky-100 dark:border-slate-800
          shadow-md rounded-full
          py-2.5 px-6 md:py-3 md:px-10 
          max-w-[90%] md:max-w-none
        "
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="
            text-base md:text-xl 
            font-semibold bg-gradient-to-r 
            from-sky-500 to-cyan-600 dark:from-sky-400 dark:to-blue-700 
            bg-clip-text text-transparent 
            tracking-tight select-none
          "
        >
          Web Portofolio
        </motion.div>

        {/* Menu */}
        <ul
          className="
            hidden md:flex 
            items-center justify-center gap-10 
            text-gray-700 dark:text-white 
            font-medium transition-colors duration-350
          "
        >
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer transition-all group"
            >
              <Link
                to={item.to}
                smooth={true}
                duration={600}
                offset={-100}
                spy={true}
                activeClass="active-link"
                className="cursor-pointer pb-1 transition-all duration-300"
              >
                {item.name}
              </Link>

              <span
                className="
                  absolute left-0 bottom-0 w-0 h-[2px]
                  bg-sky-500 dark:bg-blue-500 
                  transition-all duration-300 group-hover:w-full
                "
              ></span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Active Link CSS */}
      <style>{`
        .active-link {
          color: #0284c7;
          font-weight: 600;
          position: relative;
        }
        .dark .active-link {
          color: #3b82f6;
        }
        .active-link::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -3px;
          transform: translateX(-50%);
          width: 60%;
          height: 2px;
          background-color: currentColor;
          border-radius: 9999px;
        }
      `}</style>
    </motion.nav>
  );
}
