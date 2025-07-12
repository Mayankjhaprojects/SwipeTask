const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  location: String,
  profilePhoto: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String],
  isPublic: { type: Boolean, default: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  banned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
