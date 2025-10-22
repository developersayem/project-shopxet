import type { Request, Response } from "express";
import slugify from "slugify";
import csv from "csv-parser";
import fs from "fs";
import mongoose from "mongoose";
import { Category } from "../models/category.model";
import { fileService } from "../services/file.service";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";


//* ----------------- Create Category -----------------
export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, parent, isFeatured, isPublished } = req.body;

  if (!name) throw new ApiError(400, "Category name is required.");

  const slug = slugify(name, { lower: true, strict: true });

  // handle image upload
  let imageUrl = "";
  if (req.file) {
    const customName = fileService.generateFileName(req.file.originalname, slug);
    await fileService.moveFile(req.file.path, "categories", customName);
    imageUrl = fileService.getFileUrl("categories", customName);
  }

  // prevent duplicate category
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) throw new ApiError(400, "A category with this name already exists.");

  const parentCategory = await Category.findById(parent);

  await Category.create({
    name,
    slug,
    description,
    parent: parentCategory?._id || null,
    isFeatured,
    isPublished,
    image: imageUrl,
  });

  res
    .status(201)
    .json(new ApiResponse(201, null, "The category has been created successfully."));
});

//* ----------------- Get All Categories -----------------
export const getAllCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await Category.find()
    .populate("parent", "name slug image")
    .sort({ createdAt: -1 });

  res.json(new ApiResponse(200, categories));
});

//* ----------------- Get Category by Slug -----------------
export const getCategoryBySlug = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const category = await Category.findOne({ slug }).populate("parent", "name slug");
  if (!category) throw new ApiError(404, "Category not found");

  res.json(new ApiResponse(200, category));
});

//* ----------------- Update Category -----------------
export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, parent, isFeatured, isPublished } = req.body;

  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  // Update image if provided
  if (req.file) {
    if (category.image) {
      const oldFile = category.image.split("/").pop();
      if (oldFile) await fileService.deleteFile("categories", oldFile);
    }

    const customName = fileService.generateFileName(
      req.file.originalname,
      slugify(name || category.name, { lower: true, strict: true })
    );
    await fileService.moveFile(req.file.path, "categories", customName);
    category.image = fileService.getFileUrl("categories", customName);
  }

  if (name) {
    category.name = name;
    category.slug = slugify(name, { lower: true, strict: true });
  }
  if (description !== undefined) category.description = description;
  if (parent !== undefined) category.parent = parent || null;
  if (isFeatured !== undefined) category.isFeatured = isFeatured;
  if (isPublished !== undefined) category.isPublished = isPublished;

  await category.save();
  res.json(new ApiResponse(200, null, "Category updated"));
});

//* ----------------- Delete Category -----------------
export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Category.findByIdAndDelete(id);

  if (!deleted) throw new ApiError(404, "Category not found");

  if (deleted.image) {
    const oldFile = deleted.image.split("/").pop();
    if (oldFile) await fileService.deleteFile("categories", oldFile);
  }

  res.json(new ApiResponse(200, null, "Category deleted"));
});

//* ----------------- Delete Multiple Categories -----------------
export const deleteMultipleCategories = asyncHandler(async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) throw new ApiError(400, "IDs array is required");

  const validIds = ids.filter((id) => mongoose.isValidObjectId(id));
  if (!validIds.length) throw new ApiError(400, "No valid category IDs provided");

  const categories = await Category.find({ _id: { $in: validIds } });
  if (!categories.length) throw new ApiError(404, "No categories found for provided IDs");

  await Promise.all(
    categories.map(async (cat) => {
      if (cat.image) {
        try {
          const oldFile = cat.image.split("/").pop();
          if (oldFile) await fileService.deleteFile("categories", oldFile);
        } catch (err) {
          console.error(`Failed to delete image for category ${cat._id}:`, err);
        }
      }
    })
  );

  const result = await Category.deleteMany({ _id: { $in: validIds } });
  res.json(
    new ApiResponse(200, null, `${result.deletedCount} category(s) deleted successfully`)
  );
});

//* ----------------- Toggle Published -----------------
export const togglePublished = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  category.isPublished = !category.isPublished;
  await category.save();

  res.json(
    new ApiResponse(
      200,
      null,
      category.isPublished ? "Category published" : "Category unpublished"
    )
  );
});

//* ----------------- Toggle Featured -----------------
export const toggleFeatured = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) throw new ApiError(404, "Category not found");

  category.isFeatured = !category.isFeatured;
  await category.save();

  res.json(
    new ApiResponse(
      200,
      null,
      category.isFeatured
        ? "Category added to featured"
        : "Category removed from featured"
    )
  );
});

//* ----------------- Toggle Multiple Published -----------------
export const toggleMultiplePublished = asyncHandler(async (req: Request, res: Response) => {
  const { ids, action } = req.body;

  if (!Array.isArray(ids) || ids.length === 0)
    throw new ApiError(400, "IDs array is required");

  if (!["publish", "unpublish"].includes(action))
    throw new ApiError(400, "Invalid action. Must be 'publish' or 'unpublish'.");

  const isPublished = action === "publish";
  await Category.updateMany({ _id: { $in: ids } }, { $set: { isPublished } });

  res.json(
    new ApiResponse(
      200,
      null,
      `Categories ${isPublished ? "published" : "unpublished"} successfully`
    )
  );
});

//* ----------------- Toggle Multiple Featured -----------------
export const toggleMultipleFeatured = asyncHandler(async (req: Request, res: Response) => {
  const { ids, action } = req.body;

  if (!Array.isArray(ids) || ids.length === 0)
    throw new ApiError(400, "IDs array is required");

  if (!["feature", "unfeature"].includes(action))
    throw new ApiError(400, "Invalid action. Must be 'feature' or 'unfeature'.");

  const isFeatured = action === "feature";
  await Category.updateMany({ _id: { $in: ids } }, { $set: { isFeatured } });

  res.json(
    new ApiResponse(
      200,
      null,
      `Categories ${isFeatured ? "featured" : "unfeatured"} successfully`
    )
  );
});

//* ----------------- Import Categories (JSON or CSV) -----------------
export const importCategories = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");

  const ext = req.file.originalname.split(".").pop()?.toLowerCase();

  if (ext === "json") {
    const rawData = await fs.promises.readFile(req.file.path, "utf-8");
    const parsed = JSON.parse(rawData);

    // Step 1: Insert all categories without parents
    const created = await Category.insertMany(
      parsed.map((cat: any) => ({
        name: cat.name,
        slug: cat.slug || slugify(cat.name, { lower: true, strict: true }),
        description: cat.description || "",
        parent: null, // will link later
        image: cat.image || "",
        isFeatured: !!cat.isFeatured,
        isPublished: !!cat.isPublished,
        createdAt: cat.createdAt || new Date(),
        updatedAt: cat.updatedAt || new Date(),
      }))
    );

    // Step 2: Build map for name → _id
    const nameToId = new Map<string, string>();
    created.forEach((cat) => nameToId.set(cat.name, cat._id.toString()));

    // Step 3: Update parent links
    for (const cat of parsed) {
      if (cat.parent && cat.parent.name) {
        const childId = nameToId.get(cat.name);
        const parentId = nameToId.get(cat.parent.name);
        if (childId && parentId) {
          await Category.findByIdAndUpdate(childId, { parent: parentId });
        }
      }
    }

    return res.json(new ApiResponse(200, null, "Categories imported successfully"));
  }

  throw new ApiError(400, "Unsupported file format");
});

