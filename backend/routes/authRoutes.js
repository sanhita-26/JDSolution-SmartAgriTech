// backend/routes/authRoutes.js
import express from "express";
import { sendOtp, verifyOtp, registerUser } from "../controllers/authController.js";

const router = express.Router();

// Temporary GET route just for testing
router.get("/test", (req, res) => {
  res.json({ message: "OTP route working" });
});

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/register", registerUser);

export default router;
