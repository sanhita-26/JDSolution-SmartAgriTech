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
router.put("/update/:id", async (req, res) => {
  try {
    console.log("UPDATE ID:", req.params.id);
    console.log("UPDATE BODY:", req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        location: req.body.location,
        preferredCrops: req.body.preferredCrops,
        avatar: req.body.avatar,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;