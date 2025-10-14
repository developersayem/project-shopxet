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
  deleteMultipleCollections,
  importCollections,
  togglePublished,
  toggleFeatured,
  toggleMultiplePublished,
  toggleMultipleFeatured,
} from "../controller/collection.controller";

const router = Router();


// Create a new collection (Admin only)
router.post(
  "/",
  verifyJWT,
  requireAdmin,
  uploadTo("collections").single("image"),
  createCollection
);

// Get all collections (Public)
router.get("/", getAllCollections);

// Get all collections with products (Public)
router.get("/with-products", getAllCollectionsWithProducts);

// Get products by collection slug (Public)
router.get("/:slug/products", getProductsByCollection);

// Update an existing collection (Admin only)
router.put(
  "/:id",
  verifyJWT,
  requireAdmin,
  uploadTo("collections").single("image"),
  updateCollection
);

// Delete a collection (Admin only)
router.delete("/:id", verifyJWT, requireAdmin, deleteCollection);

// Delete multiple collections (Admin only)
router.post("/delete-many", verifyJWT, requireAdmin, deleteMultipleCollections);

// Toggle published/unpublished state (Admin only)
router.patch("/:id/toggle-published", verifyJWT, requireAdmin, togglePublished);

// Toggle published/unpublished state (Admin only)
router.patch("/:id/toggle-featured", verifyJWT, requireAdmin, toggleFeatured);

// Toggle published/unpublished state for multiple collections (Admin only)
router.patch(
  "/toggle-multiple-published",
  verifyJWT,
  requireAdmin,
  toggleMultiplePublished
);

// Toggle featured/un-featured state for multiple collections (Admin only)
router.patch(
  "/toggle-multiple-featured",
  verifyJWT,
  requireAdmin,
  toggleMultipleFeatured
);


// Import collections from JSON or CSV (Admin only)
router.post(
  "/import",
  verifyJWT,
  requireAdmin,
  uploadTo("imports").single("file"),
  importCollections
);

export default router;
