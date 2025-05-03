import {motion} from "framer-motion"
import { FaGithub, FaGoogle } from "react-icons/fa";


function LoginWithGoogle_Github() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative bg-white px-2 text-sm text-gray-500">
          Or continue with
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 w-full">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-slate-700 p-2 rounded-full text-white cursor-pointer"
        >
          <FaGithub />
        </motion.button>

        <motion.button
          // onClick={() => googleLogin()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-700 p-2 rounded-full text-white cursor-pointer"
        >
          <FaGoogle />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default LoginWithGoogle_Github;