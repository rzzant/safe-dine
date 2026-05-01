const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    allergies: {
      type: [String],
      enum: ["nuts", "dairy", "gluten", "shellfish", "eggs", "soy"],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
