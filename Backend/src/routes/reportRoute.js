const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { catchError } = require("../helper/catchError");
const Task = require("../models/taskSchema");
const router = express.Router();
const excelJS = require("exceljs");
const User = require("../models/userSchema");

// Route to export all tasks as excel PDF
router.get(
  "/export/tasks",
  authMiddleware, // Auth middleware to check if user is logged in
  adminMiddleware, // Admin middleware to verify admin access
  async (req, res) => {
    try {
      // 1. Fetch all tasks from the database and populate 'assignTo' with user name and email
      const tasks = await Task.find().populate("assignTo", "name email");

      // 2. Create a new Excel workbook
      const workBook = new excelJS.Workbook();

      // 3. Add a worksheet named "Task Report" to the workbook
      const workSheet = workBook.addWorksheet("Task Report");

      // 4. Define column headers and keys for the worksheet
      workSheet.columns = [
        { header: "Task ID", key: "_id", width: 25 }, // 5. Task ID column
        { header: "Title", key: "title", width: 25 }, // 6. Title column
        { header: "Description", key: "description", width: 25 }, // 7. Description column
        { header: "Priority", key: "priority", width: 25 }, // 8. Priority column
        { header: "Status", key: "status", width: 25 }, // 9. Status column
        { header: "Due Date", key: "dueDate", width: 25 }, // 10. Due Date column
        { header: "Assigned To", key: "assignedTo", width: 25 }, // 11. Assigned To column
      ];

      // 12. Loop through each task and format the data for the worksheet
      tasks.forEach((task) => {
        // 13. Format assigned users as "Name (Email)", joined by commas
        const assignedTo = task.assignTo
          .map((user) => `${user.name} (${user.email})`)
          .join(", ");

        // 14. Add a row to the worksheet for the current task
        workSheet.addRow({
          _id: task._id,
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: task.dueDate,
          assignedTo: assignedTo || "Unassigned", // 15. Show "Unassigned" if no user is assigned
        });
      });

      // 16. Set the response content type for Excel file
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      // 17. Set the response header to download the file with a name
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="tasks_report.xlsx"`
      );

      // 18. Write the workbook to the response and end it
      return workBook.xlsx.write(res).then(() => {
        res.end();
      });
    } catch (err) {
      // 19. Catch any errors and pass them to the error handler
      catchError(err, res);
    }
  }
);

// Route to export user task report as Excel file
router.get(
  "/export/users",
  authMiddleware,      // Middleware to check authentication
  adminMiddleware,     // Middleware to check admin access
  async (req, res) => {
    try {
      // 1. Fetch all users with only name, email, and _id fields
      const users = await User.find().select("name email _id");

      // 2. Fetch all tasks and populate assigned user info (name, email, _id)
      const tasks = await Task.find().populate("assignTo", "name email _id");

      // 3. Create an empty object to map user IDs to task statistics
      const userTaskMap = {};

      // 4. Initialize each user's task stats to zero in the map
      users.forEach((user) => {
        userTaskMap[user._id] = {
          name: user.name,
          email: user.email,
          taskCount: 0,
          pendingTasks: 0,
          inProgressTasks: 0,
          completedTasks: 0,
        };
      });

      // 5. Loop through all tasks to update stats for each assigned user
      tasks.forEach((task) => {
        if (task.assignTo) {
          // 6. For each assigned user of the task
          task.assignTo.forEach((assignedUser) => {
            // 7. If the user exists in the map
            if (userTaskMap[assignedUser._id]) {
              // 8. Increase total task count
              userTaskMap[assignedUser._id].taskCount += 1;

              // 9. Increase specific count based on task status
              if (task.status === "Pending") {
                userTaskMap[assignedUser._id].pendingTasks += 1;
              } else if (task.status === "In Progress") {
                userTaskMap[assignedUser._id].inProgressTasks += 1;
              } else if (task.status === "Completed") {
                userTaskMap[assignedUser._id].completedTasks += 1;
              }
            }
          });
        }
      });

      // 10. Create a new Excel workbook
      const workBook = new excelJS.Workbook();

      // 11. Add a worksheet named "User Task Report"
      const workSheet = workBook.addWorksheet("User Task Report");

      // 12. Define columns for the Excel sheet
      workSheet.columns = [
        { header: "User Name", key: "name", width: 30 },
        { header: "Email", key: "email", width: 40 },
        { header: "Total Assigned Tasks", key: "taskCount", width: 20 },
        { header: "Pending Tasks", key: "pendingTasks", width: 20 },
        { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
        { header: "Completed Tasks", key: "completedTasks", width: 20 },
      ];

      // 13. Add each user's task data as a row in the worksheet
      Object.values(userTaskMap).forEach((user) => {
        workSheet.addRow(user);
      });

      // 14. Set header to define Excel file content type
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      // 15. Set header to define download file name
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="users_report.xlsx"'
      );

      // 16. Write the Excel data to the response and end it
      return workBook.xlsx.write(res).then(() => {
        res.end();
      });

    } catch (err) {
      // 17. Handle any error using your catchError utility
      catchError(err, res);
    }
  }
);


module.exports = { reportRouter: router };
