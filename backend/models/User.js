import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  location: String,
  preferredCrops: [String],
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
