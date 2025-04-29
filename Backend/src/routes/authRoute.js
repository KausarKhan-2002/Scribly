const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const { catchError } = require("../helper/catchError");
const { isValidPassword } = require("../helper/customValidator");
const validator = require("validator");
const createTokenSaveCookie = require("../config/createTokenSaveCookie");
const { isAuthorized } = require("../middlewares/isAuthorized");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, fullname, email, password, confirmPassword } = req.body;

    // 1. Basic validation
    if (!username || !fullname || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 2. Check pasword valdition
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password is invalid, It must contain atleast one alphabet, one numeric character and minimum length 6 characters",
      });
    }

    // 3. Password and confirm password must be match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match." });
    }

    // 4. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "You are already an user, Please login",
      });
    }

    // 5. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create a new user
    const newUser = new User({
      username,
      fullname,
      email,
      password: hashedPassword,
    });

    // 7. Save the user to the database
    await newUser.save();

    // Send success response
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    catchError(error, res);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate inputs
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email address" });
    }

    if (!isValidPassword(password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // 2.Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // 4. Generate JWT and set cookie
    createTokenSaveCookie(user._id, res);

    // 5. Send user info (excluding password)
    res.status(200).json({
      success: true,
      message: "You are successfully logged in",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    catchError(err, res);
  }
});

// Logout Route
router.post("/logout", isAuthorized, (req, res) => {
  // 1. Clear the cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  res.status(200).json({
    success: true,
    message: "You are successfully logged out",
  });
});

module.exports = { authRouter: router };
