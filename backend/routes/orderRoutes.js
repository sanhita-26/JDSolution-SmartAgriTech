import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create order (Sell Crop)
router.post("/create", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders of a user
router.get("/user/:name", async (req, res) => {
  const orders = await Order.find({ user: req.params.name });
  res.json(orders);
});

// Track a specific order
router.get("/:trackingNo", async (req, res) => {
  const order = await Order.findOne({ trackingNo: req.params.trackingNo });
  if (!order) return res.status(404).json({ message: "Not found" });
  res.json(order);
});

export default router;

