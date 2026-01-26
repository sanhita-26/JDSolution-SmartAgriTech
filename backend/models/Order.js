import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    /* USER DETAILS */
    user: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    /* CROP DETAILS */
    crop: {
      type: String,
      required: true,
      trim: true,
    },

    qty: {
      type: Number,
      required: true,
      min: 1,
    },

    unit: {
      type: String,
      required: true,
      enum: ["kg", "quintal"],
    },

    /* TRACKING */
    trackingNo: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      default: "Requested",
      enum: [
        "Requested",
        "Assigned",
        "Out for Pickup",
        "Completed",
        "Cancelled",
      ],
    },

    /* PICKUP INFO */
    assignedTo: {
      type: String,
      default: "Not Assigned",
    },

    expectedPickupDate: {
      type: String, // simple for UI (can be Date later)
      default: "Today",
    },

    /* OPTIONAL */
    photo: {
      type: String, // base64 or image URL
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.model("Order", orderSchema);
