import { Router } from "express";
import { adminLoginController, adminRegistrationController } from "../../controller/admin/auth.controller";

const router = Router();


//* Route for register admin
router.post("/register", adminRegistrationController);

//* Route for create a team member
router.post("/create-team-member", adminRegistrationController);

//* Route for login admin
router.post("/login", adminLoginController);


export default router;
