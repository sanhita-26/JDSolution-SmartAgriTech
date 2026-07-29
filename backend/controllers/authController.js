import User from "../models/User.js";

// Fake OTP store (in-memory)
const OTP_STORE = {};

export const sendOtp = async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000); // 4 digit OTP
  OTP_STORE[phone] = otp;

  console.log("OTP for", phone, ":", otp);

  return res.json({
    success: true,
    message: "OTP sent successfully (fake)",
  });
};

export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  if (OTP_STORE[phone] != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  let user = await User.findOne({ phone });

  if (!user) {
    return res.status(400).json({ message: "User not found, please signup" });
  }

  return res.json({
    success: true,
    user,
  });
};

export const registerUser = async (req, res) => {
  const { name, phone, location, preferredCrops } = req.body;

  let existing = await User.findOne({ phone });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    phone,
    location,
    preferredCrops,
    avatar: "/avatar1.jpg",
  });

  return res.json({
    success: true,
    user,
  });
};
