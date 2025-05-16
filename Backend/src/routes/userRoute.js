const express = require("express");
const router = express.Router();
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { catchError } = require("../helper/catchError");
const User = require("../models/userSchema");
const { authMiddleware } = require("../middlewares/authMiddleware");
const Task = require("../models/taskSchema");
const { default: mongoose } = require("mongoose");

// Route to get all Users
router.get("/get-all", authMiddleware, async (req, res) => {
  try {
    // 1. Fetch all users with role 'member' and exclude passwords
    const users = await User.find({ role: "member" }).select("-password");

    // 2. If no users found, return an empty list
    if (users.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No user found", users: [] });
    }

    // 3. Map each user to include their task counts (pending, in progress, completed)
    const userWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignTo: user._id,
          status: "Pending",
        });

        const inProgressTasks = await Task.countDocuments({
          assignTo: user._id,
          stats: "In Progress",
        });

        const completedTasks = await Task.countDocuments({
          assignTo: user._id,
          status: "Completed",
        });

        // 4. Return enriched user object with task counts
        return {
          ...user._doc,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );

    // 5. Send success response with all users and their task summary
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users: userWithTaskCounts,
    });
  } catch (err) {
    catchError(err, res);
  }
});

// Route to get single User
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Check user id is genuine or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user id" });
    }

    // 2. Find user By it's user id
    const user = await User.findById(id).select("-password");
    console.log("user", user);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User fetched successfully", user });
  } catch (err) {
    catchError(err, res);
  }
});

router.put("/update/:id", async (req, res) => {});

// Route to delete User
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;

      // 1. Check id is valid or not
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid user id" });
      }

      // 2. Find user by id and delete
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "This user is either already deleted or not added yet.",
        });
      }

      return res
        .status(200)
        .json({ success: true, message: "User is deleted successfully" });
    } catch (err) {
      catchError(err, res);
    }
  }
);

module.exports = { userRouter: router };
