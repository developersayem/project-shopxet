import { Router } from "express";
import {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  addProductToCollection,
  removeProductFromCollection,
} from "../../controller/admin/collection.controller";

const router = Router();

//* route for create collection
router.post("/", createCollection);

//* Route from get all collections
router.get("/", getCollections);

//* Route from get single collection
router.get("/:id", getCollectionById);

//* Route from update collection
router.put("/:id", updateCollection);

//* Route from delete collection
router.delete("/:id", deleteCollection);

//* Add/remove product from collection
router.post("/:id/add-product", addProductToCollection);
router.post("/:id/remove-product", removeProductFromCollection);

export default router;
