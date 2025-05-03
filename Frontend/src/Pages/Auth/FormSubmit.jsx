import React from "react";
import { motion } from "framer-motion";
import Spinner from "../../Shared/Spinner";

function FormSubmit({ handleSubmit, loader, isSignup }) {
  return (
    <motion.button
      onClick={handleSubmit}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full flex justify-center bg-emerald-500 text-white py-2 rounded-md mt-4 hover:shadow-lg cursor-pointer font-medium"
    >
      {loader ? <Spinner /> : isSignup ? "Signup" : "Login"}
    </motion.button>
  );
}

export default FormSubmit;
