import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { User } from "../../models/user.model";
import { generateAccessTokenAndRefreshToken } from "../../helper/generateAccessTokenAndRefreshToken";
import { cookieOptions } from "../../utils/cookieOptions";

// *---------------- Register Buyer ----------------
export const adminRegistrationController = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);

  if ([fullName, email, password].some((f) => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  const user = await User.create({
    fullName,
    email,
    password,
  });

  

  // check the user is created or not
  const createdUser = await User.findOne({ email });
  if (!createdUser) throw new ApiError(400, "User not created");

  return res.status(201).json(
    new ApiResponse(201, { email: user.email }, "Verification code sent")
  );
});

// *---------------- Login Buyer ----------------
export const adminLoginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");


  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id as string);

  return res.status(200)
  .cookie("refreshToken", refreshToken, cookieOptions)
  .json(
    new ApiResponse(200, { accessToken, refreshToken, user }, "Login successful")
  );
});
