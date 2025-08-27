import mongoose, { Schema, Document } from "mongoose";

export interface ICollection extends Document {
  name: string;
  description?: string;
  products: mongoose.Types.ObjectId[];
}

const CollectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const Collection = mongoose.model<ICollection>("Collection", CollectionSchema);
