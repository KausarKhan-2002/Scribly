const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [4, 'Username must be at least 4 characters'],
    maxlength: [20, 'Username must be less than 20 characters'],
  },
  fullname: {
    type: String,
    required: [true, 'Fullname is required'],
    trim: true,
    minlength: [3, 'Fullname must be at least 3 characters'],
    maxlength: [50, 'Fullname must be less than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  avatar: {
    type: String,
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;