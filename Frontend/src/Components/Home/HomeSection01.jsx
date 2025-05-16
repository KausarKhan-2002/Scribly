import { GoArrowRight } from "react-icons/go";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function HomeSection01() {
  return (
    <div className="mt-17 py-20 lg:min-h-[calc(100vh-65px)] flex justify-center items-center px-6 md:px-10 lg:px-20 relative overflow-hidden">
      <section className="w-full md:w-[90%] lg:w-full lg:flex-row flex flex-col-reverse items-center justify-center gap-10 z-10">
        {/* Text Content */}
        <motion.div
          className="lg:w-[85%]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
            A Smarter Way to <span className="text-blue-500">Manage Your</span> Tasks
          </h2>
          <p className="text-slate-700 mt-4 text-base sm:text-lg">
            Our professional dashboard helps you stay on top of every task.
            Track progress in real-time, visualize data with bar and pie charts,
            and collaborate with your team — all in a clean, responsive layout
            built for productivity.
          </p>

          <Link
            to="/auth"
            className="w-40 py-3 bg-emerald-500 mt-6 text-white rounded-sm font-medium cursor-pointer flex gap-2 items-center justify-center hover:gap-3 transition"
          >
            Let's Go <GoArrowRight className="text-xl" />
          </Link>
        </motion.div>

        {/* Image with floating animations */}
        <motion.div
          className="w-full relative z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Colored floating background blobs */}
          <motion.div
            className="absolute -top-16 -left-12 w-44 h-44 bg-emerald-200 rounded-full blur-2xl opacity-40 -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-16 -right-16 w-52 h-52 bg-blue-200 rounded-full blur-2xl opacity-40 -z-10"
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          {/* Image */}
          <img
            src="dashboard.png"
            alt="Dashboard preview"
            className="w-full h-auto max-h-[500px] object-contain sm:object-cover relative z-10 rounded-xl shadow-xl"
          />
        </motion.div>
      </section>
    </div>
  );
}

export default HomeSection01;