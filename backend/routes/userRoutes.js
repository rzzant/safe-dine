const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /user — save or update user allergies
router.post("/", async (req, res) => {
  const { sessionId, allergies } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  if (!Array.isArray(allergies)) {
    return res.status(400).json({ error: "allergies must be an array" });
  }

  try {
    // Upsert: create if not exists, update if exists
    const user = await User.findOneAndUpdate(
      { sessionId },
      { allergies },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /user/:sessionId — retrieve user allergies
router.get("/:sessionId", async (req, res) => {
  try {
    const user = await User.findOne({ sessionId: req.params.sessionId });
    if (!user) {
      return res.json({ sessionId: req.params.sessionId, allergies: [] });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
