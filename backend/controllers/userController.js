// controllers/userController.js
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, location, skillsOffered, skillsWanted, availability, isPublic } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, error: "Email already in use." });

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
    res.status(201).json({ success: true, message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
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



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. If valid
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
