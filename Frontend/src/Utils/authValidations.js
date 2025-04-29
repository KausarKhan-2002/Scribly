import validator from "validator";

export const validateSignup = ({
  fullname,
  username,
  email,
  password,
  confirmPassword,
}) => {
  if (!fullname || !username || !email || !password || !confirmPassword)
    return "All fields are required";

  if (!validator.isLength(fullname, { min: 3 }))
    return "Full name must be at least 3 characters";

  if (!validator.isAlphanumeric(username))
    return "Username should be alphanumeric";

  if (!validator.isEmail(email)) return "Invalid email address";

  if (!validator.isStrongPassword(password))
    return "Password must be strong (include upper, lower, number, symbol)";

  if (password !== confirmPassword) return "Passwords do not match";

  return null;
};

export const validateLogin = ({ email, password }) => {
  if (!email || !password) return "Email and password are required";

  if (!validator.isEmail(email)) return "Invalid email address";

  return null;
};