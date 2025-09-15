import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user?: mongoose.Types.ObjectId;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state?: string;
      postalCode: string;
      country: string;
    };
  };
  products: {
    product: mongoose.Types.ObjectId;
    name: string;
    thumbnail?: string;
    quantity: number;
    priceAtCheckout: number; // snapshot price
  }[];
  total: number;
  coupon?: mongoose.Types.ObjectId;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    customerInfo: { type: Object, required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        thumbnail: { type: String },
        quantity: { type: Number, required: true },
        priceAtCheckout: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    coupon: { type: Schema.Types.ObjectId, ref: "Coupon" },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model<IOrder>("Order", OrderSchema);
