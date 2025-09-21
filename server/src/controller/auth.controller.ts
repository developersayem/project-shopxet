import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model";
import { generateAccessTokenAndRefreshToken } from "../helper/generateAccessTokenAndRefreshToken";
import { cookieOptions } from "../utils/cookieOptions";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { sendGmailMail } from "../email/gmailMailer";
import { otpTemplate } from "../email/templates";
import { verifyLicenseWithLMS } from "../utils/verifyLicenseWithLMS";


 //* =============== Get Current User ===============
export const getCurrentUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const authenticatedReq = req as AuthenticatedRequest;

    const user = await User.findById(authenticatedReq.user._id).select(
      "-password -refreshToken -loginOtp -otpExpires"
    );

    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Current user fetched successfully"));
  }
);

//* =============== Admin Login (Step 1: Send OTP) ===============
export const adminLoginController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Admin login attempt:", req.body);
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, "Email and password are required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  if (user.role !== "owner" && user.role !== "staff") {
    throw new ApiError(403, "Not authorized as admin");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.loginOtp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // expires in 10 min
  await user.save();

  // Send OTP email
  const subject = "Your Verification Code";

  await sendGmailMail(user.email, subject, otpTemplate(otp));
  // await sendSMTPMail(user.email, subject, otpTemplate(otp)); // <-- Uncomment to use SMTP

  return res.status(200).json(new ApiResponse(200, {}, "OTP sent to your email"));
});

//* =============== Verify OTP (Step 2: Complete Login) ===============
export const verifyOtpController = asyncHandler(async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email || !code) throw new ApiError(400, "Email and OTP are required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  if (!user.loginOtp || !user.otpExpires) {
    throw new ApiError(400, "No OTP generated");
  }

  if (user.otpExpires.getTime() < Date.now()) {
    throw new ApiError(400, "OTP has expired");
  }

  if (user.loginOtp !== code) {
    throw new ApiError(401, "Invalid OTP");
  }

  // 🔑 Check license before issuing tokens
if (!(await verifyLicenseWithLMS(user._id as string))) {
  return res.status(403).json(new ApiResponse(403, {}, "License expired"));
}

  // OTP valid → clear it and issue tokens
  user.loginOtp = undefined;
  user.otpExpires = undefined;

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
    user._id as string
  );

  user.refreshToken = refreshToken;
  await user.save();

  const safeUser = await User.findById(user._id).select("-password -refreshToken");

  res
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .status(200)
    .json(new ApiResponse(200, { accessToken, user: safeUser }, "Admin login successful"));
});

//* ===============  Refresh Access Token ===============
export const refreshAccessTokenController = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) throw new ApiError(401, "No refresh token provided");

  const user = await User.findOne({ refreshToken });
  if (!user) throw new ApiError(401, "Invalid refresh token");

 //  check the license
if (!(await verifyLicenseWithLMS(user._id as string))) {
  return res.status(403).json(new ApiResponse(403, {}, "License expired"));
}

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessTokenAndRefreshToken(user._id as string);

  user.refreshToken = newRefreshToken;
  await user.save();

  res.cookie("refreshToken", newRefreshToken, cookieOptions);

  return res.status(200).json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
});

//* ===============  Logout ===============
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;

  await User.findByIdAndUpdate(authenticatedReq.user._id, {
    $set: { refreshToken: "" },
  });

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
