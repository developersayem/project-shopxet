import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { User } from "../../models/user.model";
import { generateAccessTokenAndRefreshToken } from "../../helper/generateAccessTokenAndRefreshToken";
import { cookieOptions } from "../../utils/cookieOptions";

// *---------------- Register Owner ----------------
export const adminRegistrationController = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((f) => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  // only owners can be created directly here
  const user = await User.create({
    fullName,
    email,
    password,
    role: "owner", // default
  });

  if (!user) throw new ApiError(400, "User not created");

  return res.status(201).json(
    new ApiResponse(201, { email: user.email }, "Owner account created successfully")
  );
});

// *---------------- Create Team Member (by Owner only) ----------------
export const createTeamMemberController = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  const ownerId = (req as any).user?._id;
  if (!ownerId) throw new ApiError(401, "Unauthorized");

  // Ensure requester is owner
  const owner = await User.findById(ownerId);
  if (!owner || owner.role !== "owner") {
    throw new ApiError(403, "Only owners can create team members");
  }

  if ([fullName, email, password].some((f) => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exists");

  const teamUser = await User.create({
    fullName,
    email,
    password,
    role: "team",
    ownerId: owner._id,
  });

  return res.status(201).json(
    new ApiResponse(201, { email: teamUser.email }, "Team member created successfully")
  );
});

// *---------------- Login (Owner or Team) ----------------
export const adminLoginController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id as string);

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
          user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            ownerId: user.ownerId || null,
          },
        },
        "Login successful"
      )
    );
});
