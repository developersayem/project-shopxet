import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../controller/admin/category.controller";

const router = Router();

 // *  Route for create category
router.post("/", createCategory); 

 // *  Route for get all category
router.get("/", getCategories);

 // *  Route for get single category
router.get("/:id", getCategoryById); 

// * Route for update category   
router.put("/:id", updateCategory);

// * Route for delete category
router.delete("/:id", deleteCategory);

export default router;
