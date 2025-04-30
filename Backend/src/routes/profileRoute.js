const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { catchError } = require("../helper/catchError");
const router = express.Router();
const validator = require("validator");
const User = require("../models/userSchema");
const upload = require("../middlewares/uploadMiddleware");

// Get profile Route
router.get("/", authMiddleware, async (req, res) => {
  try {
    // 1. Extract user from req
    const user = req.user;

    // 2. If either user or user id does not exist
    if (!user || !user._id) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized, please login",
      });
    }

    res.status(200).json({
      success: true,
      message: "retrieve user information sucessfully",
      user,
    });
  } catch (err) {
    catchError(err, res);
  }
});

// Update profule Route
router.put("/update", authMiddleware, async (req, res) => {
  try {
    // 1. Destructure and trim fields from the request body
    let { name, email, avatar } = req.body;
    name = name?.trim();
    email = email?.trim();
    avatar = avatar?.trim();

    // 2. Get the authenticated user from req.user (set by authMiddleware)
    const user = req.user;

    // 3. If there are no changes, send a message indicating no update
    if (user.name === name && user.email === email && user.avatar === avatar) {
      return res
        .status(400)
        .json({ success: false, message: "No updated found" });
    }

    // 4. Create an empty object to collect valid fields for update
    const updateUser = {};

    if (name && name.length >= 4) {
      updateUser.name = name;
    }

    if (email && validator.isEmail(email)) {
      updateUser.email = email;
    }

    if (avatar && validator.isURL(avatar)) {
      updateUser.avatar = avatar;
    }

    // 5. If no valid fields were provided, return an error
    if (Object.keys(updateUser).length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required with valid data",
      });
    }

    // 6. Update the user document in the database with the valid fields
    const updatedUser = await User.findByIdAndUpdate(user._id, updateUser, {
      new: true, // Return the updated document
    });

    // 7. If update fails (user not found), return unauthorized message
    if (!updatedUser) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized, Please login",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    // 13. Catch and handle errors using custom catchError helper
    catchError(err, res);
  }
});


router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    // File is now available in req.file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    res.status(200).json({ success: true, message: "upload image", imageUrl });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { profileRouter: router };
