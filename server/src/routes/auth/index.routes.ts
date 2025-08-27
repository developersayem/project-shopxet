import { Router } from "express";
import { getCurrentUserController, logoutUser, refreshAccessTokenController } from "../../controller/auth/index.controller";


const router = Router()


// Route: POST /api/v1/auth/
router.get("/refresh", getCurrentUserController);

// Route: POST /api/v1/auth/
router.get("/logout", logoutUser);

// Route: POST /api/v1/auth/refresh
router.post("/refresh", refreshAccessTokenController);




export default router