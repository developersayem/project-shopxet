import { Router } from "express";
import { adminLoginController, adminRegistrationController } from "../../controller/admin/auth.controller";

const router = Router();


// Route: POST /api/v1/admin/register
router.post("/register", adminRegistrationController);

// Route: POST /api/v1/admin/login
router.post("/login", adminLoginController);


export default router;
