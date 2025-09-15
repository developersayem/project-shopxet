import { Router } from "express";
import { uploadTo } from "../middlewares/upload.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";
import {
  createCollection,
  getAllCollections,
  getAllCollectionsWithProducts,
  getProductsByCollection,
  updateCollection,
  deleteCollection,
  togglePublished,
  bulkDeleteCollections,
  importCollections,
  toggleFeatured,
} from "../controller/collection.controller";

const router = Router();

/**
 * ================================
 * Collections CRUD
 * ================================
 */

// ✅ Create a new collection (Admin only)
router.post(
  "/",
  verifyJWT,
  requireAdmin,
  uploadTo("collections").single("image"),
  createCollection
);

// ✅ Get all collections (Public)
router.get("/", getAllCollections);

// ✅ Get all collections with products (Public)
router.get("/with-products", getAllCollectionsWithProducts);

// ✅ Get products by collection slug (Public)
router.get("/:slug/products", getProductsByCollection);

// ✅ Update an existing collection (Admin only)
router.put(
  "/:id",
  verifyJWT,
  requireAdmin,
  uploadTo("collections").single("image"),
  updateCollection
);

// ✅ Delete a collection (Admin only)
router.delete("/:id", verifyJWT, requireAdmin, deleteCollection);

/**
 * ================================
 * Extra Actions
 * ================================
 */

// ✅ Toggle published/unpublished state (Admin only)
router.patch("/:id/toggle-published", verifyJWT, requireAdmin, togglePublished);

// ✅ Toggle published/unpublished state (Admin only)
router.patch("/:id/toggle-featured", verifyJWT, requireAdmin, toggleFeatured);

// ✅ Bulk delete multiple collections (Admin only)
router.post("/bulk-delete", verifyJWT, requireAdmin, bulkDeleteCollections);

/**
 * ================================
 * Import collections
 * ================================
 */

// ✅ Import collections from JSON or CSV (Admin only)
router.post(
  "/import",
  verifyJWT,
  requireAdmin,
  uploadTo("imports").single("file"),
  importCollections
);

export default router;
