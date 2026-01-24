import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("User API Working");
});

// ✅ CHECK PHONE DUPLICATE
router.post("/check-phone", async (req, res) => {
  const { phone } = req.body;

  const user = await User.findOne({ phone });

  return res.json({ exists: !!user });
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (phone only)
router.post("/login", async (req, res) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// Update Profile
router.put("/update", async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { phone: req.body.phone },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
