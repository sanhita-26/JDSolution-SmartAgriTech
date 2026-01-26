import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    location: String,
    preferredCrops: [String],
    avatar: { type: String, default: "/avatar1.jpg" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
