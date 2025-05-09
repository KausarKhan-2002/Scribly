import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { CgMailForward } from "react-icons/cg";

function Footer() {
  return (
    <div className="relative w-full bg-white text-slate-800 overflow-hidden mt-10">
      {/* Animated Backgrounds */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-emerald-200 to-blue-300 opacity-30 rounded-full top-0 left-0 blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-emerald-100 to-purple-300 opacity-20 rounded-full bottom-0 right-0 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
      />

      {/* Main Footer */}
      <motion.footer
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3 bg-white/50 backdrop-blur-md rounded-t-3xl shadow-inner border-t border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-semibold text-emerald-500">TaskPro</h2>
          <p className="text-sm mt-2 text-slate-600">
            Boost your productivity with our modern task management dashboard —
            organize, assign, and track with ease.
          </p>
        </div>
        {/* Navigation */}
        <div>
          <h3 className="text-lg font-medium mb-2">Quick Links</h3>
          <ul className="space-y-2 text-slate-600 text-sm">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <Link to="/auth">Dashboard</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-medium mb-2">Connect with Us</h3>
          <div className="flex items-center space-x-4 text-2xl mt-2">
            <a
              href="https://github.com/KausarKhan-2002"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-emerald-500 transition"
              aria-label="GitHub"
            >
              <AiFillGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/kausar-khan-88299227a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-emerald-500 transition"
              aria-label="LinkedIn"
            >
              <AiFillLinkedin />
            </a>
          </div>
          <p className="text-sm mt-3 flex items-center gap-1 text-emerald-600">
            <CgMailForward className="text-xl text-emerald-700" />{" "}
            <a
              href="mailto:kausarrkhan83@gmail.com"
              className="hover:underline"
            >
              kausarrkhan83@gmail.com
            </a>
          </p>
        </div>
      </motion.footer>

      {/* Copyright */}
      <div className="text-center text-xs text-slate-500 py-4 border-t border-gray-100">
        © {new Date().getFullYear()} TaskPro. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
