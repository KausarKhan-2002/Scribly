import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import validator from "validator";
import { isValidPassword } from "../../Utils/customValidator";
import { useValidator } from "../../Hook/useValidator";
import { useAuth } from "../../Hook/useAuth";
import Spinner from "../../Shared/Spinner";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../Utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../../Store/userSlice";

function Auth() {
  const [form, setForm] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validate = useValidator();
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const isDataValid = validate(
      isSignup,
      form.username,
      form.fullname,
      form.email,
      form.password,
      form.confirmPassword
    );

    if (!isDataValid) return;

    auth(form, setForm, isSignup, setIsSignup, setLoader);
  };

  // Success handler for Google Login
  const handleGoogleSuccess = async (response) => {
    try {
      setLoader(true);
      const decoded = jwtDecode(response.credential);
      console.log("Google User:", decoded);

      const res = await fetch(`${BASE_URL}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });

      if (!res.ok) throw new Error("Google auth failed");

      const data = await res.json();
      console.log("Backend Response:", data);

      dispatch(addUser(data.user));

      // Handle successful login (store token, redirect, etc.)
      localStorage.setItem("authToken", data.token);
      navigate("/"); // Or use your router
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  // Failure handler for Google Login
  const handleGoogleFailure = (error) => {
    console.log("Login Failed:", error);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess, // Reuse your handler
    onError: handleGoogleFailure, // Reuse your handler
    flow: "auth-code", // Match your original setup
  });

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
            {isSignup && (
              <>
                <motion.section
                  className="flex flex-col gap-1 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="text"
                    id="username"
                    onChange={handleChange}
                    name="username"
                    value={form.username}
                    placeholder="Your username"
                    className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
                  />
                  <AnimatePresence>
                    {form.username && (
                      <motion.li
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`text-xs font-mono ${
                          form.username.length >= 4
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        must be atleast 4 characters
                      </motion.li>
                    )}
                  </AnimatePresence>
                </motion.section>

                <motion.section
                  className="flex flex-col gap-1 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <input
                    type="text"
                    id="fullname"
                    onChange={handleChange}
                    name="fullname"
                    value={form.fullname}
                    placeholder="Your full name"
                    className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
                  />
                  <AnimatePresence>
                    {form.fullname && (
                      <motion.li
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`text-xs font-mono ${
                          form.fullname.length >= 4
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        must be atleast 3 characters
                      </motion.li>
                    )}
                  </AnimatePresence>
                </motion.section>
              </>
            )}

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
                      validator.isEmail(form.email)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    must be a valid email
                  </motion.li>
                )}
              </AnimatePresence>
            </motion.section>

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
                placeholder={
                  isSignup ? "Create your password" : "Your password"
                }
                className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
              />
              <AnimatePresence>
                {form.password && (
                  <motion.li
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`text-xs font-mono ${
                      isValidPassword(form.password)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    must be contain alphanumeric with atleast 6 characters
                  </motion.li>
                )}
              </AnimatePresence>
            </motion.section>

            {isSignup && (
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
            )}
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex justify-center bg-emerald-500 text-white py-2 rounded-md mt-4 hover:shadow-lg cursor-pointer font-medium"
        >
          {loader ? <Spinner /> : isSignup ? "Signup" : "Login"}
        </motion.button>

        {!isSignup && (
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

            <div className="flex flex-col items-center justify-center gap-3 w-full">
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-800 p-2 rounded-full text-white cursor-pointer"
              >
                <FaGithub />
              </motion.button> */}

              <motion.button
                // onClick={() => googleLogin()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // className="bg-slate-800 p-2 rounded-full text-white cursor-pointer"
              >
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  useOneTap
                  shape="pill"
                  theme="filled_blue"
                  size="large"
                  text="continue_with"
                />
                {/* <FaGoogle /> */}
              </motion.button>
            </div>
          </motion.div>
        )}

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
      </motion.div>
    </motion.div>
  );
}

export default Auth;