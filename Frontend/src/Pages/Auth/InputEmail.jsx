import validator from "validator";
import { AnimatePresence, motion } from "framer-motion";

function InputEmail({ form, handleChange, isSignup }) {
  return (
    <motion.section
      className="flex flex-col gap-1 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: isSignup ? 0.2 : 0.1 }}
    >
      <input
        type="text"
        id="email"
        onChange={handleChange}
        name="email"
        value={form.email}
        placeholder="Your email"
        className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
      />
      <AnimatePresence>
        {form.email && (
          <motion.li
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`text-xs font-mono ${
              validator.isEmail(form.email) ? "text-green-600" : "text-red-600"
            }`}
          >
            must be a valid email
          </motion.li>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default InputEmail;