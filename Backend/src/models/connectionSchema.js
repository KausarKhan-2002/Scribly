const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
    },
  },
  { timestamps: true }
);

const Connection = mongoose.model("connection", connectionSchema);
module.exports = Connection;
