const { catchError } = require("../helper/catchError");

const adminMiddleware = (req, res, next) => {
  try {
  
    if (req.user && req.user.role === "admin") {
      return next();
    }

    // If user is not admin
    res.status(403).json({
      success: false,
      message: "Access denied, accessable only for admin",
    });
  } catch (err) {
    catchError(err, res);
  }
};

module.exports = { adminMiddleware };
