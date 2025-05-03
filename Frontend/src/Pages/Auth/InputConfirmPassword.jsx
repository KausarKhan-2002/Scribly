import {AnimatePresence, motion} from "framer-motion"

function InputConfirmPassword({form, handleChange}) {
  return (
    <motion.section
      className="flex flex-col gap-1 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <input
        type="text"
        id="confirmPassword"
        onChange={handleChange}
        name="confirmPassword"
        value={form.confirmPassword}
        placeholder="Your confirm password"
        className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
      />
      <AnimatePresence>
        {form.confirmPassword && (
          <motion.li
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`text-xs font-mono ${
              form.password === form.confirmPassword
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            must be similar to password
          </motion.li>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default InputConfirmPassword;
