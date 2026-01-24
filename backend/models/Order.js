import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: String,
  crop: String,
  qty: String,
  unit: String,
  photo: String,
  trackingNo: String,
  date: String,
  location: String,
});

export default mongoose.model("Order", orderSchema);
