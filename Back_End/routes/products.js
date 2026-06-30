const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { mergeSort, binarySearchRange } = require("../utils/algorithms");

router.get("/sorted", async (req, res) => {
  try {
    const { category, sortBy = "price", order = "asc", minPrice, maxPrice } = req.query;

    const query = { userId: req.user.id };
    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query);

    const validFields = { price: "price", stock: "stock", name: "name" };
    const field = validFields[sortBy] || "price";

    const getValue = (item) =>
      field === "name" ? item.name.toLowerCase() : item[field];

    const sorted = mergeSort(products, getValue, order === "desc" ? "desc" : "asc");

    if ((minPrice !== undefined || maxPrice !== undefined) && field === "price") {
      const ascSorted = order === "desc"
        ? mergeSort(products, getValue, "asc")
        : sorted;

      const min = minPrice !== undefined ? Number(minPrice) : -Infinity;
      const max = maxPrice !== undefined ? Number(maxPrice) : Infinity;

      const inRange = binarySearchRange(ascSorted, getValue, min, max);
      const result = order === "desc" ? inRange.slice().reverse() : inRange;

      return res.json({ success: true, data: result });
    }

    res.json({ success: true, data: sorted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category", { userId: req.user.id });
    res.json({ success: true, data: categories.sort() });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { search = "", category } = req.query;
    const query = { userId: req.user.id };

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, category, brand, size, price, stock, description, image, attributes } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ success: false, message: "Name, Category and Price are required." });
    }

    let status = "In Stock";
    if (stock <= 0) status = "Out of Stock";
    else if (stock < 10) status = "Low Stock";

    const product = await Product.create({
      userId: req.user.id,
      name, category, brand, size,
      price: Number(price),
      stock: Number(stock),
      status, description, image,
      attributes: attributes || {},
    });

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, category, brand, size, price, stock, description, image, attributes } = req.body;

    let status = "In Stock";
    if (stock <= 0) status = "Out of Stock";
    else if (stock < 10) status = "Low Stock";

    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, category, brand, size, price: Number(price), stock: Number(stock), description, image, status, attributes: attributes || {} },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;