import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";
import { verifyLicenseWithLMS } from "../utils/verifyLicenseWithLMS";

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    if (!user) throw new ApiError(401, "Unauthorized");

    // Resolve owner if staff
    let ownerId = user._id;
    if (user.role === "staff") {
      const staffUser = await User.findById(user._id).select("ownerId");
      ownerId = staffUser?.ownerId || user._id;
    }

    const owner = await User.findById(ownerId);
    if (!owner) throw new ApiError(403, "Owner not found");
    if (!owner.licenseKey) throw new ApiError(403, "No license found");

    const now = Date.now();

    // If license has expired based on stored licenseExpiresAt, block immediately
    if (owner.licenseExpiresAt && owner.licenseExpiresAt.getTime() < now) {
      throw new ApiError(403, "License expired");
    }

    // If license was not synced recently, check LMS
    const fifteenMinutes = 15 * 60 * 1000;
    const lastSync = owner.licenseLastSyncedAt?.getTime() || 0;

    if (now - lastSync > fifteenMinutes) {
      const isValid = await verifyLicenseWithLMS(owner._id as string);
      if (!isValid) throw new ApiError(403, "License expired or invalid");
    }

    // Attach owner info to request for downstream use
    (req as any).owner = owner;

    next();
  } catch (err) {
    if (err instanceof ApiError) return next(err);
    next(new ApiError(403, "License expired or invalid"));
  }
};
