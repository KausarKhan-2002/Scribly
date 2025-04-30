const jwt = require("jsonwebtoken");

const createTokenSaveCookie = (userId, res) => {
  console.log("userId", userId);
  
  const token = jwt.sign({ userId }, process.env.JWT_SIGN, {
    expiresIn: "30d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction, // Only send over HTTPS in production
    sameSite: isProduction ? "None" : "Lax", // Better CSRF protection in production
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SIGN, {
    expiresIn: "7d",
  });
};

module.exports = { createTokenSaveCookie, generateToken };
