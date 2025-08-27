import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

// ---------- TypeScript Interfaces ----------
export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string; // hashed

  refreshToken: string;

  // methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// ---------- Schema ----------
const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ---------- Pre-save Hook ----------
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ---------- Instance Methods ----------
UserSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
// Generate access token
UserSchema.methods.generateAccessToken = function (): string {
  const expiresIn = (process.env.JWT_ACCESS_TOKEN_EXPIRY ||
    "1h") as `${number}${"s" | "m" | "h" | "d"}`; // e.g., '1h', '10d'
  const options: SignOptions = { expiresIn };

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    options
  );
};
// Generate refresh token
UserSchema.methods.generateRefreshToken = function (): string {
  const expiresIn = (process.env.JWT_REFRESH_TOKEN_EXPIRY ||
    "7d") as `${number}${"s" | "m" | "h" | "d"}`; // e.g., '1h', '10d' // default 7d
  const options: SignOptions = { expiresIn };
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    options // Ensure algorithm is specified
  );
};

// ---------- Export Model ----------
export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
