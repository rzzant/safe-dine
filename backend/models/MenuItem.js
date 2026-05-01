const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["starter", "main", "dessert", "drink"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    allergens: {
      type: [String],
      enum: ["nuts", "dairy", "gluten", "shellfish", "eggs", "soy"],
      default: [],
    },
    emoji: {
      type: String,
      default: "🍽️",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
