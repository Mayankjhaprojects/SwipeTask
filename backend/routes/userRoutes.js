// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  getPublicUsers,
  getUserById,
  toggleVisibility,
  deleteUser,
} = require("../controllers/userController");

// POST /api/users/register
router.post("/register", registerUser);

// GET /api/users/public
router.get("/public", getPublicUsers);

// GET /api/users/:id
router.get("/:id", getUserById);

// PATCH /api/users/:id/toggle-visibility
router.patch("/:id/toggle-visibility", toggleVisibility);

// DELETE /api/users/:id
router.delete("/:id", deleteUser);

module.exports = router;
