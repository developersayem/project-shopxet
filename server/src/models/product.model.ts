import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description?: string;
  purchasePrice: number;
  regularPrice: number;
  salePrice?: number;
  category: mongoose.Types.ObjectId;
  brand?: mongoose.Types.ObjectId;
  tags?: string[];
  thumbnail: string; // main product image
  gallery: string[]; // multiple images
  stock: number;
  attributes?: {
    name: string; // e.g. "Color"
    value: string; // e.g. "Red"
  }[];
  variations?: {
    sku?: string;
    price: number;
    stock: number;
    attributes: {
      name: string;
      value: string;
    }[];
    images?: string[];
  }[];
  isFeatured: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },

    purchasePrice: { type: Number, required: true },
    regularPrice: { type: Number, required: true },
    salePrice: { type: Number },

    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    tags: [{ type: String }],

    thumbnail: { type: String, required: true }, // product main image
    gallery: [{ type: String }], // product gallery images

    stock: { type: Number, default: 0 },

    attributes: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],

    variations: [
      {
        sku: { type: String },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        attributes: [
          {
            name: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
        images: [{ type: String }],
      },
    ],

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
