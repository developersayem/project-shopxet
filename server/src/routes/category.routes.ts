import { Router } from "express";
import { uploadTo } from "../middlewares/upload.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";
import {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  deleteMultipleCategories,
  importCategories,
  togglePublished,
  toggleFeatured,
  toggleMultiplePublished,
  toggleMultipleFeatured,
} from "../controller/category.controller";

const router = Router();

// ----------------- Create Category (Admin only) -----------------
router.post(
  "/",
  verifyJWT,
  requireAdmin,
  uploadTo("categories").single("image"),
  createCategory
);

// ----------------- Get All Categories (Public) -----------------
router.get("/", getAllCategories);

// ----------------- Get Category by Slug (Public) -----------------
router.get("/:slug", getCategoryBySlug);

// ----------------- Update Category (Admin only) -----------------
router.put(
  "/:id",
  verifyJWT,
  requireAdmin,
  uploadTo("categories").single("image"),
  updateCategory
);

// ----------------- Delete Category (Admin only) -----------------
router.delete("/:id", verifyJWT, requireAdmin, deleteCategory);

// ----------------- Delete Multiple Categories (Admin only) -----------------
router.post("/delete-many", verifyJWT, requireAdmin, deleteMultipleCategories);

// ----------------- Toggle Published (Admin only) -----------------
router.patch("/:id/toggle-published", verifyJWT, requireAdmin, togglePublished);

// ----------------- Toggle Featured (Admin only) -----------------
router.patch("/:id/toggle-featured", verifyJWT, requireAdmin, toggleFeatured);

// ----------------- Toggle Multiple Published (Admin only) -----------------
router.patch(
  "/toggle-multiple-published",
  verifyJWT,
  requireAdmin,
  toggleMultiplePublished
);

// ----------------- Toggle Multiple Featured (Admin only) -----------------
router.patch(
  "/toggle-multiple-featured",
  verifyJWT,
  requireAdmin,
  toggleMultipleFeatured
);

// ----------------- Import Categories (Admin only) -----------------
router.post(
  "/import",
  verifyJWT,
  requireAdmin,
  uploadTo("imports").single("file"),
  importCategories
);

export default router;
