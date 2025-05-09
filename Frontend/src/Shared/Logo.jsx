import { motion } from "framer-motion";
import { FaFeatherAlt, FaLeaf } from "react-icons/fa";

function Logo() {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <FaLeaf className="text-2xl text-emerald-500 animate-pulse" />

      <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-emerald-500 via-emerald-400 via-60% to-blue-600 bg-clip-text text-transparent">
        Scribly
      </h1>
    </motion.div>
  );
}

export default Logo;
