const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { catchError } = require("../helper/catchError");
const { default: mongoose, connection } = require("mongoose");
const Connection = require("../models/connectionSchema");
const User = require("../models/userSchema");
const router = express.Router();

router.post("/send/:id", authMiddleware, async (req, res) => {
  try {
    const senderId = req.user._id;
    const recieverId = req.params.id;

    // console.log("SenderId:", senderId);
    // console.log("RecieverId:", recieverId);

    // 1. Validate the given ID
    if (!mongoose.Types.ObjectId.isValid(recieverId) || !senderId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID provided.",
      });
    }

    // 2. Do not send request for itself
    if (senderId.equals(recieverId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid operations considered.",
      });
    }

    // 2. Check if a connection already exists (in any direction)
    const existingConnection = await Connection.findOne({
      $or: [
        { fromUserId: senderId, toUserId: recieverId },
        { fromUserId: recieverId, toUserId: senderId },
      ],
    });

    // 3. Handle existing connection scenarios
    if (existingConnection) {
      if (existingConnection?.status === "accepted") {
        // Already connected
        return res.status(400).json({
          success: false,
          message: "You are already connected with this user.",
        });
      }

      if (existingConnection?.status === "rejected") {
        // Already rejected
        return res.status(400).json({
          success: false,
          message: "This user is already rejected your request.",
        });
      }

      // Pending request exists
      return res.status(400).json({
        success: false,
        message:
          "A connection request is already pending between you and this user.",
      });
    }

    // 4. Create a new connection request
    const newRequest = await Connection.create({
      fromUserId: senderId,
      toUserId: recieverId,
      status: "pending",
    });

    // 5. Respond with success
    return res.status(200).json({
      success: true,
      message: "Connection request sent successfully.",
      request: newRequest,
    });
  } catch (err) {
    // Step 6: Handle unexpected errors
    catchError(err, res);
  }
});

router.put("/accept/:id", authMiddleware, async (req, res) => {
  try {
    const recieverId = req.user._id;
    const senderId = req.params.id;

    console.log("SenderId:", senderId);
    console.log("RecieverId:", recieverId);

    // 1. Validate ObjectId formats
    if (!mongoose.Types.ObjectId.isValid(senderId) || !recieverId) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID(s) provided.",
      });
    }

    // 2. Find existing connection request
    const connection = await Connection.findOne({
      fromUserId: senderId,
      toUserId: recieverId,
    });

    // 3. If no such request exists
    if (!connection) {
      return res.status(200).json({
        success: false,
        message: "No connection request found from this user.",
      });
    }

    // 4. If already connected from this user
    if (connection?.status === "accepted") {
      return res.status(409).json({
        success: false,
        message: "You are already connected with this user.",
      });
    }

    // 4. If already rejected from this user
    if (connection?.status === "rejected") {
      return res.status(409).json({
        success: false,
        message: "You are already rejected this user.",
      });
    }

    // 5. Update the connection to mark as connected
    connection.status = "accepted";
    await connection.save();

    return res.status(200).json({
      success: true,
      message: "Connection request accepted successfully.",
      connection,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while accepting connection.",
    });
  }
});

router.put("/reject/:id", authMiddleware, async (req, res) => {
  try {
    const recieverId = req.user._id;
    const senderId = req.params.id;

    console.log("SenderId:", senderId);
    console.log("RecieverId:", recieverId);

    // 1. Validate ObjectId formats
    if (
      !mongoose.Types.ObjectId.isValid(recieverId) ||
      !mongoose.Types.ObjectId.isValid(senderId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID(s) provided.",
      });
    }

    // 2. Find existing connection request
    const connection = await Connection.findOne({
      fromUserId: senderId,
      toUserId: recieverId,
    });

    // 3. If no such request exists
    if (!connection) {
      return res.status(200).json({
        success: false,
        message: "No connection request found from this user.",
      });
    }

    // 4. If already rejected of this user
    if (connection?.status === "rejected") {
      return res.status(409).json({
        success: false,
        message: "You are already rejected of this user.",
      });
    }

    // 5. If already accepted of this user
    if (connection?.status === "accepted") {
      return res.status(409).json({
        success: false,
        message: "You are already accepted of this user.",
      });
    }

    // 5. Update the connection to mark as connected
    connection.status = "rejected";
    await connection.save();

    return res.status(200).json({
      success: true,
      message: "Connection request rejected successfully.",
      connection,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error while accepting connection.",
    });
  }
});

router.get("/connection-requests", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    // 1. If no logged in user
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "You are not logged in" });
    }

    // 2. Find all connection requests populated with (id, name, avatar)
    const myRequests = await Connection.find({
      toUserId: user._id,
      status: "pending",
    }).populate("fromUserId", "name avatar");

    // 3. If not connection requests exist
    if (myRequests.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You don't have any requests",
        requests: myRequests,
      });
    }

    // 4. Send only required data
    const requests = myRequests.map((request) => ({
      connectionId: request._id,
      userId: request.fromUserId._id,
      name: request.fromUserId.name,
      avatar: request.fromUserId.avatar,
      connection: request.status,
    }));

    res.status(200).json({
      success: true,
      message: "Retrieved your all requests successfully",
      requests: requests,
      count: myRequests.length,
    });
  } catch (err) {
    catchError(err, res);
  }
});

router.get("/outgoing-requests", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    // 1. Check if user is not authenticated
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // 2. Find all the outgoing request connections
    const connections = await Connection.find({
      fromUserId: user._id,
    }).populate("toUserId", "name avatar");

    // 3. if not outgoing outgoing connections exist
    if (connections.length === 0) {
      return res.status(200).json({
        success: false,
        message: "You did not sent request yet anywhere.",
      });
    }

    // 4. Format all connections with relevant fields
    const all = connections.map((connection) => ({
      connectionId: connection._id,
      recieverId: connection.toUserId._id,
      name: connection.toUserId.name,
      avatar: connection.toUserId.avatar,
      connection: connection.status,
    }));

    res.status(200).json({
      success: true,
      message: "Retrieve your all outgoing connections successfully",
      connections: all,
      count: connections.length,
    });
  } catch (err) {
    catchError(err, res);
  }
});

router.get("/outgoing-pending-requests", authMiddleware, async (req, res) => {
  try {
    const user = req.user;

    // 2. Check if user is not authenticated
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // 3. Fetch all active (connected) connections involving this user
    const connections = await Connection.find({
      fromUserId: user._id,
      status: "pending",
    }).populate("toUserId", "name avatar"); // 4. Populate only name and avatar from fromUserId

    // 5. If no connections found, return a valid empty response
    if (connections.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Your all sent requests have accepted.",
        connections: [],
      });
    }

    // 6. Format all connections with relevant fields
    const pendingConnections = connections.map((connection) => ({
      connectionId: connection._id,
      userId: connection.toUserId._id,
      name: connection.toUserId.name,
      avatar: connection.toUserId.avatar,
      isConnected: connection.isConnected,
    }));

    // 7. Send the final success response
    res.status(200).json({
      success: true,
      message: "Retrieved all outgoing pending requests.",
      pendingConnections,
      count: connections.length,
    });
  } catch (err) {
    catchError(err, res);
  }
});

router.get("/all-connections", authMiddleware, async (req, res) => {
  try {
    // 1. Get the authenticated user
    const user = req.user;

    // 2. Check if user is not authenticated
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    // 3. Fetch all active (connected) connections involving this user
    const connections = await Connection.find({
      $or: [{ toUserId: user._id }, { fromUserId: user._id }],
      status: "accepted",
    })
      .populate("toUserId", "name avatar")
      .populate("fromUserId", "name avatar");

    // 5. If no connections found, return a valid empty response
    if (connections.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You don't have any connections yet.",
        connections: [],
      });
    }

    // 6. Format all connections with relevant fields exluding current logged in user
    const allConnections = connections.map((connection) => {
      const otherUser = connection.fromUserId.equals(user._id)
        ? connection.toUserId
        : connection.fromUserId;

      return {
        connectionId: connection._id,
        userId: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar,
        connection: connection.status,
      };
    });

    // 7. Send the final success response
    res.status(200).json({
      success: true,
      message: "Retrieved all your connections successfully.",
      connections: allConnections,
      count: connections.length,
    });
  } catch (err) {
    // 8. Handle any unexpected error
    catchError(err, res);
  }
});

router.get("/suggestions", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Find all connections involving current user (sent, received, accepted, etc.)
    const connections = await Connection.find({
      $or: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    });

    // 2. Extract all connected or requested user IDs
    const excludedUserIds = new Set();
    connections.forEach(conn => {
      if (conn.status === "accepted" || conn.status === "pending") {
        excludedUserIds.add(conn.fromUserId.toString());
        excludedUserIds.add(conn.toUserId.toString());
      }
    });

    // Also exclude the user himself
    excludedUserIds.add(userId.toString());

    // 3. Suggest users who are NOT in excluded list
    const suggestions = await User.find({
      _id: { $nin: Array.from(excludedUserIds) },
      role: { $ne: "admin" } // optional
    }).select("-password -role");

    res.status(200).json({
      success: true,
      message: "Here are your connection suggestions",
      suggestions,
    });

  } catch (error) {
    console.error("Suggestions Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch suggestions",
    });
  }
});


module.exports = { connectionRouter: router };
