import React from "react";
import toast from "react-hot-toast";
import validator from "validator";
import { isValidPassword } from "../Utils/customValidator";

export const useValidator = () => {
  return (isSignup, name, email, password, confirmPassword) => {
    // name__________
    if (isSignup) {
      if (!name) {
        toast.error("Username is required");
        return;
      }
      if (name.length < 4) {
        toast.error("Username must be contain atleast 4 characters");
      }
    }

    // email_________
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!validator.isEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    // password_________
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (!isValidPassword(password)) {
      toast.error("Invalid password");
      return;
    }
    if (isSignup) {
      if (!confirmPassword) {
        toast.error("confirm password is required");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match");
        return;
      }
    }

    return true;
  };
};
