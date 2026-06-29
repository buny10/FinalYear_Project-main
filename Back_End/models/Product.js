const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      default: "",
    },

    size: {
      type: String,
      default: "",
    },

    price: {
      type: "Number",
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    // Flexible bucket for category-specific fields that don't deserve
    // their own column on every product (e.g. sport, condition, color).
    // Stored as a plain object: { sport: "Tennis", condition: "New" }
    attributes: {
      type: Map,
      of: String,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);