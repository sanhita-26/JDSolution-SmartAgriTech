import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* ---------------- TRACKING NUMBER ---------------- */
const generateTrackingNo = () => {
  return "JD" + Math.floor(100000 + Math.random() * 900000);
};

/* ---------------- CREATE ORDER ---------------- */
router.post("/create", async (req, res) => {
  try {
    console.log("ORDER BODY:", req.body);

    const {
      user,
      phone,
      location,
      crop,
      qty,
      unit,
      photo,
    } = req.body;

    /* BASIC VALIDATION */
    if (!phone || !location || !crop || !qty || !unit) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const order = await Order.create({
      user: user || "Farmer",
      phone,
      location,
      crop,
      qty: Number(qty),
      unit,
      photo: photo || "",

      trackingNo: generateTrackingNo(),

      status: "Requested",
      assignedTo: "Not Assigned",
      expectedPickupDate: "Today",
    });

    console.log("ORDER SAVED:", order.trackingNo);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("ORDER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
});

/* ---------------- TRACK ORDER ---------------- */
router.get("/track/:trackingNo", async (req, res) => {
  try {
    const { trackingNo } = req.params;

    const order = await Order.findOne({ trackingNo });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("TRACK ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Tracking failed",
    });
  }
});

/* ---------------- GET ALL ORDERS (OPTIONAL BUT USEFUL) ---------------- */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

export default router;
