import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useValidator } from "../../Hook/useValidator";
import { useAuth } from "../../Hook/useAuth";
import InputName from "./InputName";
import InputEmail from "./InputEmail";
import InputPassword from "./InputPassword";
import InputConfirmPassword from "./InputConfirmPassword";
import FormSubmit from "./FormSubmit";
import LoginWithGoogle_Github from "./LoginWithGoogle_Github";
import SwitchLoginSignup from "./SwitchLoginSignup";

function Auth() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [loader, setLoader] = useState(false);
  const validate = useValidator();
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const isDataValid = validate(
      isSignup,
      form.name,
      form.email,
      form.password,
      form.confirmPassword
    );

    if (!isDataValid) return;

    auth(form, setForm, isSignup, setIsSignup, setLoader);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed w-screen h-screen flex justify-center items-center bg-slate-100"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-7 shadow-lg border border-slate-300 rounded-lg w-[450px] bg-white"
      >
        <motion.h2
          className="mb-6 text-2xl text-center font-semibold text-slate-800"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {isSignup ? "Create Your Account" : "Welcome back"}
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSignup ? "signup" : "login"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {isSignup && <InputName form={form} handleChange={handleChange} />}

            <InputEmail
              form={form}
              handleChange={handleChange}
              isSignup={isSignup}
            />

            <InputPassword
              form={form}
              handleChange={handleChange}
              isSignup={isSignup}
            />

            {isSignup && (
              <InputConfirmPassword form={form} handleChange={handleChange} />
            )}
          </motion.div>
        </AnimatePresence>

        <FormSubmit
          handleSubmit={handleSubmit}
          loader={loader}
          isSignup={isSignup}
        />

        {!isSignup && <LoginWithGoogle_Github />}

        <SwitchLoginSignup isSignup={isSignup} setIsSignup={setIsSignup} />
      </motion.div>
    </motion.div>
  );
}

export default Auth;