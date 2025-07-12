// controllers/adminController.js
const User = require("../models/User");
const SwapRequest = require("../models/SwapRequest");
const Feedback = require("../models/Feedback");
const AdminMessage = require("../models/AdminMessage");

// Ban or unban a user
exports.toggleBanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.banned = !user.banned;
    await user.save();

    res.json({ message: `User has been ${user.banned ? "banned" : "unbanned"}.` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user status." });
  }
};

// Send broadcast message
exports.sendBroadcast = async (req, res) => {
  try {
    const { message } = req.body;
    const newMessage = new AdminMessage({ message });
    await newMessage.save();
    res.status(201).json({ message: "Broadcast sent successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to send broadcast." });
  }
};

// View basic report
exports.getReport = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const feedbackCount = await Feedback.countDocuments();
    const swapCount = await SwapRequest.countDocuments();

    res.json({ userCount, feedbackCount, swapCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch report." });
  }
};
