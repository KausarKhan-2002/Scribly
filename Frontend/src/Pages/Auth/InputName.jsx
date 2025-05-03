import React from "react";
import { motion , AnimatePresence} from "framer-motion";

function InputName({form, handleChange}) {
  return (
    <>
      <motion.section
        className="flex flex-col gap-1 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <input
          type="text"
          id="name"
          onChange={handleChange}
          name="name"
          value={form.name}
          placeholder="Your name"
          className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
        />
        <AnimatePresence>
          {form.name && (
            <motion.li
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`text-xs font-mono ${
                form.name.length >= 4 ? "text-green-600" : "text-red-600"
              }`}
            >
              must be atleast 4 characters
            </motion.li>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}

export default InputName;
