import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  stock: number;
  images: string[];
  category: mongoose.Types.ObjectId;
  collections: mongoose.Types.ObjectId[];
  isFeatured: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }], // store image URLs
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    isFeatured: { type: Boolean, default: false }, // e.g. for homepage
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
