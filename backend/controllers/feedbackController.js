// controllers/feedbackController.js
const Feedback = require("../models/Feedback");

// Submit feedback after a swap
exports.submitFeedback = async (req, res) => {
  try {
    const { fromUser, toUser, swapId, rating, comment } = req.body;
    const feedback = new Feedback({
      fromUser,
      toUser,
      swapId,
      rating,
      comment
    });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback." });
  }
};

// Get feedback received by a user
exports.getFeedbackForUser = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ toUser: req.params.id })
      .populate("fromUser", "name")
      .populate("swapId", "skillOffered skillRequested");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve feedback." });
  }
};
