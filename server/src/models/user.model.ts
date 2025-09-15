import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

export type UserRole = "owner" | "staff";

export interface IUser extends Document {
  avatar?: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  ownerId?: mongoose.Types.ObjectId; // if staff, link to the admin
  isActive: boolean;
  loginOtp?: string;
  otpExpires?: Date;
  refreshToken?: string;

  // 🔑 license fields
  licenseKey?: string;
  licenseSecret?: string;
  licenseExpiresAt?: Date;
  licenseLastSyncedAt?: Date;

  // methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const UserSchema = new Schema<IUser>(
  {
    avatar: { type: String },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["owner", "staff"], default: "owner" },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    isActive: { type: Boolean, default: true },
    loginOtp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    refreshToken: { type: String, default: null },

    // 🔑 license info
    licenseKey: { type: String, default: null },
    licenseSecret: { type: String, default: null },
    licenseExpiresAt: { type: Date, default: null },
    licenseLastSyncedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Hash password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password correctly
UserSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Generate access token
UserSchema.methods.generateAccessToken = function (): string {
  const expiresIn =
    (process.env.JWT_ACCESS_TOKEN_EXPIRY || "1h") as `${number}${"s" | "m" | "h" | "d"}`;
  const options: SignOptions = { expiresIn };

  return jwt.sign(
    { _id: this._id, email: this.email, role: this.role, ownerId: this.ownerId },
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    options
  );
};

// Generate refresh token
UserSchema.methods.generateRefreshToken = function (): string {
  const expiresIn =
    (process.env.JWT_REFRESH_TOKEN_EXPIRY || "7d") as `${number}${"s" | "m" | "h" | "d"}`;
  const options: SignOptions = { expiresIn };

  return jwt.sign(
    { _id: this._id, role: this.role, ownerId: this.ownerId },
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    options
  );
};

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
