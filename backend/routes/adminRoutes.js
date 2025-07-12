// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  toggleBanUser,
  sendBroadcast,
  getReport,
} = require("../controllers/adminController");

// PATCH /api/admin/ban/:id
router.patch("/ban/:id", toggleBanUser);

// POST /api/admin/message
router.post("/message", sendBroadcast);

// GET /api/admin/report
router.get("/report", getReport);

module.exports = router;
