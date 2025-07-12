// controllers/requestController.js
const SwapRequest = require("../models/SwapRequest");
const User = require("../models/User");

// Create a new swap request
exports.sendRequest = async (req, res) => {
  try {
    const { requesterId, receiverId, skillOffered, skillRequested } = req.body;

    // Validate required fields
    if (!requesterId || !receiverId || !skillOffered || !skillRequested) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Optional: check if users exist
    const requester = await User.findById(requesterId);
    const receiver = await User.findById(receiverId);
    if (!requester || !receiver) {
      return res.status(404).json({ error: "Requester or Receiver not found" });
    }

    // Create the swap request
    const newRequest = await SwapRequest.create({
      requesterId,
      receiverId,
      skillOffered,
      skillRequested,
    });

    res.status(201).json({ message: "Swap request sent", request: newRequest });
  } catch (error) {
    console.error("❌ Error sending request:", error);
    res.status(500).json({ error: "Failed to send request." });
  }
};


// Get requests for a specific user
exports.getRequestsForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const requests = await SwapRequest.find({ receiverId: userId }).populate("requesterId", "name");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch requests." });
  }
};

// Accept or reject a request
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // accepted or rejected

    const request = await SwapRequest.findById(id);
    if (!request) return res.status(404).json({ error: "Request not found." });

    request.status = status;
    await request.save();

    res.json({ message: `Request ${status}.` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update request." });
  }
};

// Delete a request
exports.deleteRequest = async (req, res) => {
  try {
    await SwapRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Request deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete request." });
  }
};
