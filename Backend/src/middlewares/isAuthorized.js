const { catchError } = require("../helper/catchError");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("token:", token);
    

    // 1. If no token provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, You are not authorized",
      });
    }

    // 2. Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SIGN);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, You are not authorized",
      });
    }

    // 3. Find user from decoded userId
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Attach user to request and continue
    req.user = user;
    next();
  } catch (error) {
    catchError(error, res);
  }
};