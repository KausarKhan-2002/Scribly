const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { catchError } = require("../helper/catchError");
const router = express.Router();
const validator = require("validator");
const User = require("../models/userSchema");
const { generateToken } = require("../config/createTokenSaveCookie");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

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

    const token = generateToken();

    res.status(200).json({
      success: true,
      message: "retrieve user information sucessfully",
      user,
      token,
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

router.put("/upload-image", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const { cloudinaryUrl, public_id } = req.body;

    if (!validator.isURL(cloudinaryUrl) || !public_id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid URL or public_id" });
    }

    const existingUser = await User.findById(user._id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If user already has an avatar, delete it from Cloudinary
    if (existingUser.avatar?.public_id) {
      console.log("public_id:", existingUser.avatar?.public_id);

      // await cloudinary.uploader.destroy(existingUser.avatar?.public_id);
      // console.log("deleted previous img");

      cloudinary.uploader
        .destroy(existingUser.avatar.public_id)
        .then((res) => console.log("Deleted", res))
        .catch((err) => console.error("Failed", err));
    }

    // Update user with new avatar
    existingUser.avatar = { cloudinaryUrl, public_id };
    await existingUser.save();

    res.json({
      success: true,
      message: "Avatar updated successfully",
      user: existingUser,
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { profileRouter: router };
