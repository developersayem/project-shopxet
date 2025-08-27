import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  bannerImages: string[];
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    primaryColor: { type: String, default: "#3cbc65" },
    secondaryColor: { type: String, default: "#2f8c4d" },
    logo: { type: String },
    bannerImages: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
