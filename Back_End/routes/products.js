const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { mergeSort, binarySearchRange } = require("../utils/algorithms");

// =======================
// GET SORTED / PRICE-RANGE FILTERED PRODUCTS
// (must be declared BEFORE /:id so "sorted" isn't treated as an id)
//
// Query params:
//   category   - optional, filter by category first
//   sortBy     - "price" | "stock" | "name" (default "price")
//   order      - "asc" | "desc" (default "asc")
//   minPrice   - optional, lower bound for price range filter
//   maxPrice   - optional, upper bound for price range filter
//
// Flow:
//   1. Fetch matching products from MongoDB (no .sort() here on purpose).
//   2. Sort them ourselves with mergeSort() -> O(n log n).
//   3. If a price range was requested, use binarySearchRange() on the
//      now-sorted array to grab just the items in [minPrice, maxPrice]
//      in O(log n) instead of scanning every item.
// =======================
router.get("/sorted", async (req, res) => {
  try {
    const { category, sortBy = "price", order = "asc", minPrice, maxPrice } = req.query;

    const query = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const products = await Product.find(query); // unsorted on purpose

    const validFields = { price: "price", stock: "stock", name: "name" };
    const field = validFields[sortBy] || "price";

    const getValue = (item) =>
      field === "name" ? item.name.toLowerCase() : item[field];

    const sorted = mergeSort(products, getValue, order === "desc" ? "desc" : "asc");

    // Binary search range filtering only makes sense when sorted by price,
    // and only when ascending (our binarySearchRange expects ascending order).
    if ((minPrice !== undefined || maxPrice !== undefined) && field === "price") {
      const ascSorted = order === "desc"
        ? mergeSort(products, getValue, "asc")
        : sorted;

      const min = minPrice !== undefined ? Number(minPrice) : -Infinity;
      const max = maxPrice !== undefined ? Number(maxPrice) : Infinity;

      const inRange = binarySearchRange(ascSorted, getValue, min, max);

      // preserve requested display order even though we searched ascending
      const result = order === "desc" ? inRange.slice().reverse() : inRange;

      return res.json({ success: true, data: result });
    }

    res.json({ success: true, data: sorted });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});


// =======================
// GET DISTINCT CATEGORIES
// (must be declared BEFORE /:id so "categories" isn't treated as an id)
// =======================
router.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.json({
      success: true,
      data: categories.sort(),
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});


// =======================
// GET ALL PRODUCTS
// =======================
router.get("/", async (req, res) => {
  try {
    const { search = "", category } = req.query;

    const query = {};

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: products,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
});


// =======================
// ADD PRODUCT
// =======================

router.post("/", async (req, res) => {

  try {

    const {
      name,
      category,
      brand,
      size,
      price,
      stock,
      description,
      image,
      attributes,
    } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, Category and Price are required.",
      });
    }

    let status = "In Stock";

    if (stock <= 0)
      status = "Out of Stock";
    else if (stock < 10)
      status = "Low Stock";

    const product = await Product.create({
      name,
      category,
      brand,
      size,
      price: Number(price),
      stock: Number(stock),
      status,
      description,
      image,
      attributes: attributes || {},
    });

    res.status(201).json({
      success: true,
      data: product,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});


// =======================
// UPDATE PRODUCT
// =======================

router.put("/:id", async (req, res) => {

  try {

    const {
      name,
      category,
      brand,
      size,
      price,
      stock,
      description,
      image,
      attributes,
    } = req.body;

    let status = "In Stock";

    if (stock <= 0)
      status = "Out of Stock";
    else if (stock < 10)
      status = "Low Stock";

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        brand,
        size,
        price: Number(price),
        stock: Number(stock),
        description,
        image,
        status,
        attributes: attributes || {},
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: updated,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});


// =======================
// DELETE PRODUCT
// =======================

router.delete("/:id", async (req, res) => {

  try {

    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

});

module.exports = router;