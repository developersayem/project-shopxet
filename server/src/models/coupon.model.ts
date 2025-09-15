import mongoose, { Schema, Document } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  discountType: "percentage" | "fixed"; // e.g. 10% or $10 off
  discountValue: number;
  startDate?: Date;
  expiryDate?: Date;
  usageLimit?: number; // total times coupon can be used
  usedCount: number;
  isActive: boolean;

  // Relations
  products?: mongoose.Types.ObjectId[]; // linked products
  appliesToAll: boolean; // if true, applies to all products
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true },

    startDate: { type: Date },
    expiryDate: { type: Date },
    usageLimit: { type: Number },
    usedCount: { type: Number, default: 0 },

    isActive: { type: Boolean, default: true },

    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    appliesToAll: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model<ICoupon>("Coupon", CouponSchema);
