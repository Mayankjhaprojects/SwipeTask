// routes/requestRoutes.js
const express = require("express");
const router = express.Router();
const {
  sendRequest,
  getRequestsForUser,
  updateRequestStatus,
  deleteRequest,
} = require("../controllers/requestController");

// POST /api/requests
router.post("/", sendRequest);

// GET /api/requests/user/:id
router.get("/user/:id", getRequestsForUser);

// PATCH /api/requests/:id/status
router.patch("/:id/status", updateRequestStatus);

// DELETE /api/requests/:id
router.delete("/:id", deleteRequest);

module.exports = router;
