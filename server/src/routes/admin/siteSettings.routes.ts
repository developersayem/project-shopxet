import { Router } from "express";
import {
  getSiteSettings,
  updateSiteSettings,
} from "../../controller/admin/siteSettings.controller";

const router = Router();

//* Route for get site setting (styles)
router.get("/", getSiteSettings);  
//* Route for update site settings
router.put("/", updateSiteSettings);

export default router;
