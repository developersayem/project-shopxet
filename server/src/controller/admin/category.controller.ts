import { Request, Response, NextFunction } from "express";
import {Category} from "../../models/category.model";
import slugify from "slugify";

// * Create Category
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });

    const slug = slugify(name, { lower: true, strict: true });

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, slug });

    res.status(201).json({ message: "Category created successfully ✅", category });
  } catch (error) {
    next(error);
  }
};

// * Get All Categories
export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// * Get Single Category
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found ❌" });

    res.json(category);
  } catch (error) {
    next(error);
  }
};

// * Update Category
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found ❌" });

    if (name) {
      category.name = name;
      category.slug = slugify(name, { lower: true, strict: true });
    }

    await category.save();

    res.json({ message: "Category updated successfully ✅", category });
  } catch (error) {
    next(error);
  }
};

// * Delete Category
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found ❌" });

    res.json({ message: "Category deleted successfully ✅" });
  } catch (error) {
    next(error);
  }
};
