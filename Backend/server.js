// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authRouter } = require("./src/routes/authRoute");
const { userRouter } = require("./src/routes/userRoute");
const { taskRouter } = require("./src/routes/taskRoute");
const { reportRouter } = require("./src/routes/reportRoute");
const { profileRouter } = require("./src/routes/profileRoute");
const { dashBoardRouter } = require("./src/routes/dashboardRoute");

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["content-type", "Authorization"],
    credentials: true,
  })
);
// In your backend server (e.g., Express)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin"); // Allows interaction with same-origin windows
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp"); // Allows embedding of cross-origin resources safely
  next();
});

app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");

    // Once MongoDB is connected, start the server
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    // If MongoDB connection fails, log the error and stop the server from starting
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with a failure code
  });

// My routes starts here
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/task", taskRouter);
app.use("/dashboard", dashBoardRouter);
app.use("/reports", reportRouter);