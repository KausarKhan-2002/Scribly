import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

function HomeSection03() {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-between items-center px-6 md:px-10 lg:px-20 py-20 bg-white relative overflow-hidden">
      {/* Left Text Section */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left z-10"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
          Streamline Task Management with Smart Tools
        </h2>
        <p className="text-slate-700 mt-4 text-base md:text-lg">
          Organize, assign, and monitor tasks effortlessly with intuitive
          features designed for productivity. From creating tasks to tracking
          progress and setting priorities, manage everything in one place.
        </p>
        <Link
          to="/auth"
          className="w-40 py-3 bg-emerald-500 mt-6 text-white rounded-sm font-medium cursor-pointer flex gap-2 items-center justify-center hover:gap-3 transition"
        >
          Let's connect <GoArrowRight className="text-xl" />
        </Link>
      </motion.div>

      {/* Right Image Section with Decorations */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-0 z-10"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="relative w-full max-w-xl">
          {/* Original rotated background card */}
          <div className="absolute top-3 left-3 w-full h-full bg-emerald-100 rounded-xl -z-10 rotate-2 shadow-lg"></div>

          {/* Image */}
          <img
            src="tasks.png"
            alt="Task Dashboard"
            className="rounded-xl shadow-xl object-cover w-full"
          />

          {/* Floating Colored Animation Backgrounds (non-intrusive) */}
          <motion.div
            className="absolute -top-16 -left-12 w-44 h-44 bg-emerald-200 rounded-full blur-2xl opacity-40 -z-20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-16 -right-16 w-52 h-52 bg-blue-200 rounded-full blur-2xl opacity-40 -z-20"
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default HomeSection03;