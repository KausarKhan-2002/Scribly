const express = require("express");
const { catchError } = require("../helper/catchError");
const Task = require("../models/taskSchema");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const router = express.Router();

// Route to get dashboard data
router.get("/admin", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // 1. Count total tasks and categorized by their status
    const allTasks = await Task.countDocuments();
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const progressTasks = await Task.countDocuments({ status: "In Progress" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });

    // 2. Count tasks that are overdue (not completed and due date has passed)
    const overDueTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    const allowedStatuses = ["Pending", "In Progress", "Completed"];

    // MongoDB aggregate approach to get task distribution by status
    // (commented out in favor of logic-based method below)
    // const taskDistribution = await Task.aggregate([
    //   {
    //     $group: {
    //       _id: "$status",
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]);

    // 3. Logic-based task distribution (faster since we already have individual counts)
    const taskDistributionRaw = [
      { _id: "Pending", count: pendingTasks },
      { _id: "In Progress", count: progressTasks },
      { _id: "Completed", count: completedTasks },
    ];

    // 4. Format task distribution into object like { Pending: X, InProgress: Y, Completed: Z }
    const taskDistribution = allowedStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, ""); // Removes spaces for keys like 'In Progress' -> 'InProgress'
      acc[formattedKey] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});

    // 5. Priority level grouping using aggregation
    const allowedPriorities = ["Low", "Medium", "High"];
    const taskPriorityRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    // 6. Format priority data into an object like { Low: X, Medium: Y, High: Z }
    const taskPriorityLevels = allowedPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    // 7. Fetch latest 10 created tasks with selected fields
    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    // 8. Final response
    res.status(200).json({
      success: true,
      message: "Fetch Dashboard data successfully",
      statistics: {
        allTasks,
        pendingTasks,
        progressTasks,
        completedTasks,
        overDueTasks,
      },
      charts: {
        taskDistribution,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (err) {
    catchError(err, res);
  }
});


// Route to get user dashboard data
router.get("/user", authMiddleware, async (req, res) => {
  try {
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { dashBoardRouter: router };
