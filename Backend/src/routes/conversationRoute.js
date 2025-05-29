const express = require("express");
const { catchError } = require("../helper/catchError");
const Conversation = require("../models/ConversationSchema");
const { default: mongoose } = require("mongoose");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

// Route to send message
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // 1. Validate input
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2. Create and save new message
    const newMsg = new Conversation({
      senderId,
      receiverId,
      message,
    });

    // 3. Dispatch message in DB
    const sendMsg = await newMsg.save();

    res.status(201).json({
      message: "Message sent successfully",
      data: sendMsg,
    });
  } catch (err) {
    catchError(err, res);
  }
});

// Route to retreive all messages
router.get("/all/:otherUserId", authMiddleware, async (req, res) => {
  try {
    const otherUserId = req.params.otherUserId;
    // console.log(req.user);

    const myUserId = req.user._id;

    // 1. Validate IDs
    if (!mongoose.Types.ObjectId.isValid(otherUserId) || !myUserId) {
      return res.status(400).json({ error: "Invalid user IDs" });
    }

    // 2. Find conversation messages between both users
    const messages = await Conversation.find({
      $or: [
        { senderId: myUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myUserId },
      ],
    }).sort({ createdAt: 1 });

    // 3. If no messages found
    if (!messages.length) {
      return res.status(200).json({
        success: true,
        message: "No conversation found",
        conversation: null,
      });
    }

    // 4. Send messages
    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      conversation: messages,
    });
  } catch (err) {
    catchError(err, res);
  }
});

module.exports = { conversationRoute: router };
