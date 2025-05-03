import React from "react";
import { isValidPassword } from "../../Utils/customValidator";
import { AnimatePresence, motion } from "framer-motion";

function InputPassword({ form, handleChange, isSignup }) {
  return (
    <motion.section
      className="flex flex-col gap-1 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: isSignup ? 0.25 : 0.15 }}
    >
      <input
        type="text"
        id="password"
        onChange={handleChange}
        name="password"
        value={form.password}
        placeholder={isSignup ? "Create your password" : "Your password"}
        className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
      />
      <AnimatePresence>
        {form.password && (
          <motion.li
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`text-xs font-mono ${
              isValidPassword(form.password) ? "text-green-600" : "text-red-600"
            }`}
          >
            must be contain alphanumeric with atleast 6 characters
          </motion.li>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default InputPassword;
