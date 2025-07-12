// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, location, skillsOffered, skillsWanted, availability, isPublic } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
      skillsOffered,
      skillsWanted,
      availability,
      isPublic
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all public profiles
exports.getPublicUsers = async (req, res) => {
  try {
    const users = await User.find({ isPublic: true, banned: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Toggle user public/private status
exports.toggleVisibility = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.isPublic = !user.isPublic;
    await user.save();
    res.json({ message: "Visibility updated.", isPublic: user.isPublic });
  } catch (err) {
    res.status(500).json({ error: "Failed to update visibility." });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user." });
  }
};

