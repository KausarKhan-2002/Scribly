const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { catchError } = require("../helper/catchError");
const Task = require("../models/taskSchema");
const { default: mongoose } = require("mongoose");
const { allowedStatuses } = require("../helper/constant");
const router = express.Router();

// Route to get all tasks (Admin gets all, User gets only assigned)
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;

    // Create filter object based on query (like status = "Pending")
    let filter = {};
    if (status) {
      filter.status = status;
    }

    let tasks;

    // If admin, fetch all tasks and populate assigned user details
    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate("assignTo", "name email avatar");
    } else {
      // If member, fetch only tasks assigned to them
      tasks = await Task.find({ ...filter, assignTo: req.user.id }).populate(
        "assignTo",
        "name email avatar"
      );
    }

    // For each task, calculate how many to-do items are completed
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedToDoCount = task.toDoChecklist.filter(
          (item) => item.completed
        ).length;
        // Add completedToDoCount to each task object
        return { ...task._doc, completedToDoCount };
      })
    );

    // Count total number of tasks (admin: all, user: only their tasks)
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignTo: req.user._id }
    );

    // Count Pending tasks (conditionally for user or admin)
    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignTo: req.user._id }),
    });

    // Count In Progress tasks
    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "In Progress",
      ...(req.user.role !== "admin" && { assignTo: req.user._id }),
    });

    // Count Completed tasks
    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignTo: req.user._id }),
    });

    // Send success response with tasks count
    res.status(200).json({
      success: true,
      message: "Fetch all tasks",
      tasks,
      statusSummary: {
        allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (err) {
    // Handle errors centrally
    catchError(err, res);
  }
});

// Route to get a task by user ID (createdBy field) - only accessible if logged in
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user id" });
    }

    // 2. Find a task where the user with given ID is the creator
    // Also populate assigned user's basic info (name, email, avatar)
    const task = await Task.findById(id).populate(
      "assignTo",
      "name email avatar"
    );

    // 3. If no task found for creator, return error
    if (!task) {
      return res
        .status(400)
        .json({ success: false, message: "Task not found" });
    }

    // 4. Return success response with the fetched task
    res
      .status(200)
      .json({ success: true, message: "Task fetched successfully", task });
  } catch (err) {
    // Step 5: Centralized error handler
    catchError(err, res);
  }
});

// Route to create a task (Admin only)
router.post("/create", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = req.user;

    if (!user && !user.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const {
      title,
      description,
      priority,
      dueDate,
      assignTo,
      toDoChecklist,
      attachments,
    } = req.body;
    // console.log(req.body);

    if (!Array.isArray(assignTo)) {
      return res.status(400).json({
        success: false,
        message: "assignTo must be an array of user id's",
      });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignTo,
      attachments,
      toDoChecklist,
      createdBy: user._id,
    });

    res.status(200).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    catchError(err, res);
  }
});

// Route to update a task by ID
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      priority,
      status,
      dueDate,
      toDoChecklist,
      assignTo,
      attachments,
    } = req.body;
    console.log(id);

    // 1. Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID format",
      });
    }

    // 2. Find the task by ID
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 3. If assignTo is provided, validate that it's an array
    if (assignTo && !Array.isArray(assignTo)) {
      return res.status(400).json({
        success: false,
        message: "assignTo must be an array of user IDs",
      });
    }

    // 4. Update only the fields that are provided in the request body
    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    task.toDoChecklist = toDoChecklist || task.toDoChecklist;
    task.attachments = attachments || task.attachments;
    task.assignTo = assignTo || task.assignTo;


    // 5. Save the updated task to the database
    const updatedTask = await task.save();

    // 6. Send success response with updated task
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    catchError(err, res);
  }
});

// Route to delete a task (Admin only)
router.delete(
  "/delete/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;

      // 1. Check if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid task ID format",
        });
      }
      console.log("Delete Id: ", id);

      // 2. Find the task by ID
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      // 3. Delete task
      await task.deleteOne();

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (err) {
      catchError(err, res);
    }
  }
);

// Route to update task status
router.put(
  "/update-status/:id",
  authMiddleware, // Ensure user is authenticated
  adminMiddleware, // Ensure user has admin privileges
  async (req, res) => {
    try {
      const { id } = req.params;
      let { status } = req.body;

      // 1. Check if the provided task ID is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid task id" });
      }

      // 2. Find the task by ID
      const task = await Task.findById(id);
      if (!task) {
        return res
          .status(400)
          .json({ success: false, message: "Task not found" });
      }

      status = status.trim();

      // 3. Validate the provided status against allowed values
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `"${status}" is not a recognized task status. Allowed values are: ${taskStatus.join(
            ", "
          )}`,
        });
      }

      // 4. Prevent unnecessary update if the status hasn't changed
      if (task.status === status) {
        return res.status(400).json({
          success: false,
          message: `The task is already marked as "${status}". No changes were made.`,
        });
      }

      // 5. Update task status (or keep existing if not provided)
      task.status = status || task.status;

      // 6. If status is 'Completed', mark all checklist items as completed and set progress to 100%
      if (task.status === "Completed") {
        task.toDoChecklist.forEach((list) => (list.completed = true));
        task.progress = 100;
      }

      // 7. Save the updated task
      await task.save();

      // 8. Send success response with updated task
      res
        .status(200)
        .json({ success: true, message: "Status updated successfully", task });
    } catch (err) {
      catchError(err, res);
    }
  }
);

// Route to update task checklist
router.put(
  "/update-checklist/:id",
  authMiddleware, //  Ensure user is authenticated
  // adminMiddleware, //  Ensure user has admin privileges
  async (req, res) => {
    try {
      const { id } = req.params;
      const { toDoChecklist } = req.body;
      const user = req.user;
      // console.log(toDoChecklist);
      

      // 1. Validate the provided task ID
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Task ID" });
      }

      // 2. Find the task by ID
      const task = await Task.findById(id);
      if (!task) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found" });
      }

      // 3. Check permission — only assigned users or admin can update
      if (!task.assignTo.includes(user._id) && user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update the checklist",
        });
      }

      // 4. Update checklist (ensure 'completed' is always boolean)
      task.toDoChecklist = toDoChecklist.map((item) => ({
        text: item.text,
        completed: typeof item.completed === "boolean" ? item.completed : false,
      }));

      // 5. Calculate progress percentage from completed tasks
      const completeCount = task.toDoChecklist.filter(
        (list) => list.completed
      ).length;
      const totalItems = task.toDoChecklist.length;
      task.progress =
        totalItems > 0 ? Math.round((completeCount / totalItems) * 100) : 0;

      // 6. Auto-update status based on progress
      if (task.progress === 100) {
        task.status = "Completed";
      } else if (task.progress > 0) {
        task.status = "In Progress";
      } else {
        task.status = "Pending";
      }

      // 7. Save updated task
      await task.save();

      // 8. Refetch with populated user details
      const updatedTask = await Task.findById(id).populate(
        "assignTo",
        "name email avatar"
      );

      // 9. Return success response
      res.status(200).json({
        success: true,
        message: "Checklist updated successfully",
        task: updatedTask,
      });
    } catch (err) {
      catchError(err, res);
    }
  }
);

module.exports = { taskRouter: router };
