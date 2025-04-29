import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import validator from "validator";
import { isValidPassword } from "../Utils/customValidator";
import { useValidator } from "../Hook/useValidator";
import { useAuth } from "../Hook/useAuth";
import Spinner from "../Shared/Spinner";

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

    console.log(form);
  };

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-slate-100">
      <div className="p-7 shadow-lg border border-slate-300 rounded-lg w-[450px]">
        <h2 className="mb-6 text-2xl text-center font-semibold text-slate-800">
          {isSignup ? "Create Your Account" : "Welcome back"}
        </h2>

        {isSignup && (
          <section className="flex flex-col gap-1 mb-4">
            <input
              type="text"
              id="username"
              onChange={handleChange}
              name="username"
              value={form.username}
              placeholder="Your username"
              className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
            />
            {form.username && (
              <li
                className={`text-xs font-mono ${
                  form.username.length >= 4 ? "text-green-600" : "text-red-600"
                }`}
              >
                must be atleast 4 characters
              </li>
            )}
          </section>
        )}

        {isSignup && (
          <section className="flex flex-col gap-1 mb-4">
            <input
              type="text"
              id="fullname"
              onChange={handleChange}
              name="fullname"
              value={form.fullname}
              placeholder="Your full name"
              className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
            />
            {form.fullname && (
              <li
                className={`text-xs font-mono ${
                  form.fullname.length >= 4 ? "text-green-600" : "text-red-600"
                }`}
              >
                must be atleast 3 characters
              </li>
            )}
          </section>
        )}

        <section className="flex flex-col gap-1 mb-4">
          <input
            type="text"
            id="email"
            onChange={handleChange}
            name="email"
            value={form.email}
            placeholder="Your email"
            className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
          />
          {form.email && (
            <li
              className={`text-xs font-mono ${
                validator.isEmail(form.email)
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              must be a valid email
            </li>
          )}
        </section>

        <section className="flex flex-col gap-1 mb-4">
          <input
            type="text"
            id="password"
            onChange={handleChange}
            name="password"
            value={form.password}
            placeholder={isSignup ? "Create your password" : "Your password"}
            className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
          />
          {form.password && (
            <li
              className={`text-xs font-mono ${
                isValidPassword(form.password)
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              must be contain alphanumeric with atleast 6 characters
            </li>
          )}
        </section>

        {isSignup && (
          <section className="flex flex-col gap-1 mb-4">
            <input
              type="text"
              id="confirmPassword"
              onChange={handleChange}
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="Your confirm password"
              className="w-full border-b text-sm font-mono border-slate-300 py-2 px-1 pl-3 outline-none rounded-sm focus:border-slate-500"
            />
            {form.confirmPassword && (
              <li
                className={`text-xs font-mono ${
                  form.password === form.confirmPassword
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                must be similar to password
              </li>
            )}
          </section>
        )}

        <button
          onClick={handleSubmit}
          className="w-full flex justify-center bg-emerald-500 text-white py-2 rounded-md mt-4 hover:scale-101 duration-200 hover:shadow-lg cursor-pointer font-medium"
        >
          {loader ? <Spinner /> : isSignup ? "Signup" : "Login"}
        </button>

        {isSignup && (
          <div className="flex justify-center mt-3 gap-3">
            <button className="bg-slate-600 p-2 rounded-full text-white cursor-pointer hover:scale-110 duration-200">
              <FaGithub />
            </button>
            <button className="bg-red-600 p-2 rounded-full text-white cursor-pointer hover:scale-110 duration-200">
              <FaGoogle size={15.5} />
            </button>
          </div>
        )}

        <div className="flex justify-center text-[.8rem] font-mono mt-3">
          {isSignup ? (
            <p>
              Already an user?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsSignup(false)}
              >
                please Login
              </span>
            </p>
          ) : (
            <p>
              You are new?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsSignup(true)}
              >
                Please Signup
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;
