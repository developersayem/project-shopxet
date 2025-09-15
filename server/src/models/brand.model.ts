import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export interface IBrand extends Document {
  name: string;
  slug: string;
  logo?: string;
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    logo: { type: String },
  },
  { timestamps: true }
);

// -------------------- Pre-save hook to auto-generate slug --------------------
BrandSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, {
      lower: true,  // convert to lowercase
      strict: true, // remove special characters
    });
  }
  next();
});

export const Brand = mongoose.model<IBrand>("Brand", BrandSchema);
