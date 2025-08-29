import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

export type Role = "owner" | "team";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string; 
  role: Role; // either "owner" or "team"
  ownerId?: mongoose.Types.ObjectId; // if team member, link to the main owner

  // methods
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["owner", "team"],
      default: "owner",
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference back to the main owner
      default: null,
    },
  },
  { timestamps: true }
);

// Hash password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
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
