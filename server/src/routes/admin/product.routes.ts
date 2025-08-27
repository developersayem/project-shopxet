import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../controller/admin/product.controller";

const router = Router();

//* Route for create product
router.post("/", createProduct);

// * Route for get all products
router.get("/", getProducts);

// * Route for get single product
router.get("/:id", getProductById);

// * Route for update product
router.put("/:id", updateProduct);

// * Route for delete product
router.delete("/:id", deleteProduct);

export default router;
