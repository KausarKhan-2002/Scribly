import { motion } from "framer-motion";

function SwitchLoginSignup({ isSignup, setIsSignup }) {
  return (
    <motion.div
      className="flex justify-center text-[.8rem] font-mono mt-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {isSignup ? (
        <motion.p whileHover={{ scale: 1.02 }}>
          Already an user?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsSignup(false)}
          >
            please Login
          </span>
        </motion.p>
      ) : (
        <motion.p whileHover={{ scale: 1.02 }}>
          You are new?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsSignup(true)}
          >
            Please Signup
          </span>
        </motion.p>
      )}
    </motion.div>
  );
}

export default SwitchLoginSignup;
