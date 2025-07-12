// routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const {
  submitFeedback,
  getFeedbackForUser,
} = require("../controllers/feedbackController");

// POST /api/feedbacks
router.post("/", submitFeedback);

// GET /api/feedbacks/user/:id
router.get("/user/:id", getFeedbackForUser);

module.exports = router;
