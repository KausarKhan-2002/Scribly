const express = require("express");
const { catchError } = require("../helper/catchError");
const Task = require("../models/taskSchema");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { allowedStatuses, allowedPriorities } = require("../helper/constant");
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
    taskDistribution["all"] = allTasks;

    // 5. Priority level grouping using aggregation
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

// Route to get user assign dashboard data
router.get("/user/assign", authMiddleware, async (req, res) => {
  try {
    // 1. Get user ID from the request object (set by auth middleware)
    const userId = req.user?._id;

    // 2. If user ID is missing, return an unauthorized error
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
    }

    // 3. Count total tasks assigned to the user
    const allTasks = await Task.countDocuments({ assignTo: userId });

    // 4. Count pending tasks
    const pendingTasks = await Task.countDocuments({
      assignTo: userId,
      status: "Pending",
    });

    // 5. Count tasks in progress
    const progressTasks = await Task.countDocuments({
      assignTo: userId,
      status: "In Progress",
    });

    // 6. Count completed tasks
    const completedTasks = await Task.countDocuments({
      assignTo: userId,
      status: "Completed",
    });

    // 7. Count overdue tasks (not completed and past due date)
    const overDueTasks = await Task.countDocuments({
      assignTo: userId,
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    // 8. Create raw task distribution data for charting
    const taskDistributionRaw = [
      { _id: "Pending", count: pendingTasks },
      { _id: "In Progress", count: progressTasks },
      { _id: "Completed", count: completedTasks },
    ];

    // 9. Generate a normalized task distribution object using allowedStatuses
    const taskDistribution = allowedStatuses.reduce((acc, status) => {
      acc[status] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});

    // 10. Add total tasks to taskDistribution
    taskDistribution["all"] = allTasks;

    // 11. Aggregate tasks by priority level for the user
    const priorityLevelRaw = await Task.aggregate([
      { $match: { assignTo: userId } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    // 12. Generate a normalized priority level object (note: `allowedRoles` likely should be `allowedPriorities`)
    const taskPriorityLevels = allowedPriorities.reduce((acc, priority) => {
      acc[priority] =
        priorityLevelRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    // 13. Fetch recent tasks by sorting based on createdAt
    const recentTasks = await Task.find({ assignTo: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    // 14. Return task statistics, chart data, and all created tasks
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      statistics: {
        allTasks,
        pendingTasks,
        progressTasks,
        completedTasks,
        overDueTasks,
      },
      charts: {
        taskDistributionRaw,
        taskDistribution,
        priorityLevelRaw,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (err) {
    catchError(err, res);
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  try {
    // 1. Get user ID from the request object (set by auth middleware)
    const userId = req.user?._id;

    // 2. If user ID is missing, return an unauthorized error
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "You are not authorized" });
    }

    // 3. Count total tasks assigned to the user
    const allTasks = await Task.countDocuments({ assignTo: userId });

    // 4. Count pending tasks
    const pendingTasks = await Task.countDocuments({
      assignTo: userId,
      status: "Pending",
    });

    // 5. Count tasks in progress
    const progressTasks = await Task.countDocuments({
      assignTo: userId,
      status: "In Progress",
    });

    // 6. Count completed tasks
    const completedTasks = await Task.countDocuments({
      assignTo: userId,
      status: "Completed",
    });

    // 7. Count overdue tasks (not completed and past due date)
    const overDueTasks = await Task.countDocuments({
      assignTo: userId,
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    // 8. Create raw task distribution data for charting
    const taskDistributionRaw = [
      { _id: "Pending", count: pendingTasks },
      { _id: "In Progress", count: progressTasks },
      { _id: "Completed", count: completedTasks },
    ];

    // 9. Generate a normalized task distribution object using allowedStatuses
    const taskDistribution = allowedStatuses.reduce((acc, status) => {
      acc[status] =
        taskDistributionRaw.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});

    // 10. Add total tasks to taskDistribution
    taskDistribution["all"] = allTasks;

    // 11. Aggregate tasks by priority level for the user
    const priorityLevelRaw = await Task.aggregate([
      { $match: { assignTo: userId } },
      { $group: { _id: "$priority", count: { $sum: 1 } } },
    ]);

    // 12. Generate a normalized priority level object (note: `allowedRoles` likely should be `allowedPriorities`)
    const taskPriorityLevels = allowedPriorities.reduce((acc, priority) => {
      acc[priority] =
        priorityLevelRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    // 13. Fetch recent tasks by sorting based on createdAt
    const recentTasks = await Task.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    // 14. Return task statistics, chart data, and all created tasks
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      statistics: {
        allTasks,
        pendingTasks,
        progressTasks,
        completedTasks,
        overDueTasks,
      },
      charts: {
        taskDistributionRaw,
        taskDistribution,
        priorityLevelRaw,
        taskPriorityLevels,
      },
      recentTasks,
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = {dashBoardRouter: router}