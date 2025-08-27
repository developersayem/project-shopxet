import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ---------- TypeScript Interfaces ----------
export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // hashed
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ---------- Pre-save Hooks ----------
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ---------- Instance Methods ----------
UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  const expiresIn = (process.env.JWT_ACCESS_TOKEN_EXPIRY || "1h") as `${number}${"s" | "m" | "h" | "d"}`;
  return jwt.sign({ _id: this._id, email: this.email, role: this.role }, process.env.JWT_ACCESS_TOKEN_SECRET!, { expiresIn });
};

UserSchema.methods.generateRefreshToken = function () {
  const expiresIn = (process.env.JWT_REFRESH_TOKEN_EXPIRY || "7d") as `${number}${"s" | "m" | "h" | "d"}`;
  return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_TOKEN_SECRET!, { expiresIn });
};

// ---------- Export Model ----------
export const User = mongoose.model<IUser>("User", UserSchema);
