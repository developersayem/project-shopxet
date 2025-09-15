import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

import { requireAdmin } from "../middlewares/admin.middleware";
import { adminLoginController, getCurrentUserController, logoutUser, refreshAccessTokenController, verifyOtpController } from "../controller/auth.controller";

const router = Router();


// Protected → Get current user
router.get("/me", verifyJWT, requireAdmin, getCurrentUserController);

// Public → Admin tries to log in (step 1: send OTP)
router.post("/login", adminLoginController);

// Public → Admin verifies OTP (step 2: complete login)
router.post("/verify-code", verifyOtpController);

// Protected → Refresh access token
router.post("/refresh-token", verifyJWT, requireAdmin, refreshAccessTokenController);

// Protected → Logout
router.post("/logout", verifyJWT, requireAdmin, logoutUser);

export default router;
