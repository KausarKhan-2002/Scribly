const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const { catchError } = require("../helper/catchError");
const { isValidPassword } = require("../helper/customValidator");
const validator = require("validator");
const {
  createTokenSaveCookie,
  generateToken,
} = require("../config/createTokenSaveCookie");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");

// Initialize Google OAuth2 client with your Google Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, adminInviteToken } =
      req.body;

    // 1. Basic validation
    if (!name || !email || !password || !confirmPassword) {
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

    let role = "member";
    if (
      adminInviteToken &&
      adminInviteToken === process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    // 5. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create a new user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    catchError(error, res);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

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

    const { password: _, ...loginUser } = user._doc;

    // 5. Send user info (excluding password)
    res.status(200).json({
      success: true,
      message: "You are successfully logged in",
      user: loginUser,
    });
  } catch (err) {
    catchError(err, res);
  }
});

// Logout Route
router.post("/logout", authMiddleware, (req, res) => {
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

// Login with google Route
router.post("/google-login", async (req, res) => {
  try {
    // 1. Extract token from cookies
    const token = req.body.token;

    if (!token) {
      return res.status(400).json({ error: "Token not found" });
    }

    // 2. Verify token with Google API
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // google client ID
    });

    // 3.
    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      // First time Google login → create new user
      user = await User.create({
        email,
        name,
        avatar: picture,
      });
    }

    createTokenSaveCookie(user._id, res);

    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", user });
  } catch (error) {
    catchError(error, res);
  }
});

module.exports = { authRouter: router };
