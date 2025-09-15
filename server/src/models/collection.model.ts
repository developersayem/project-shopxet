import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";


export interface ICollection extends Document {
  name: string;
  slug: string;
  description?: string;
  products: mongoose.Types.ObjectId[]; // linked products
  isFeatured: boolean; // highlight collection on homepage
  isPublished: boolean;
  image?: string; // banner/thumbnail for collection
}

const CollectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    image: { type: String },
  },
  { timestamps: true }
);

// -------------------- Pre-save hook for slug --------------------
CollectionSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Collection = mongoose.model<ICollection>(
  "Collection",
  CollectionSchema
);
