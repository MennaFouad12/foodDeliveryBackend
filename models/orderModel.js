import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ربط بالـ User Model
    ref: "User",
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["Food Processing", "Out for delivery", "Delivered", "Cancelled"],
    default: "Food Processing",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  payment: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
