import type { Request, Response } from "express";
import slugify from "slugify";
import csv from "csv-parser";
import fs from "fs";
import { Collection } from "../models/collection.model";
import { fileService } from "../services/file.service";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

// ----------------- Create Collection -----------------
export const createCollection = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, isFeatured, isPublished, products } = req.body;

  if (!name) throw new ApiError(400, "Collection name is required.");
  const slug = slugify(name, { lower: true, strict: true });

  let imageUrl = "";
  if (req.file) {
    const customName = fileService.generateFileName(
      req.file.originalname,
      slug
    );
    await fileService.moveFile(req.file.path, "collections", customName);
    imageUrl = fileService.getFileUrl("collections", customName);
  }

  const existingCollection = await Collection.findOne({ name });
  if (existingCollection) {
    throw new ApiError(400, "A collection with this name already exists.");
  }

  const collection = await Collection.create({
    name,
    slug,
    description,
    isFeatured,
    isPublished,
    products,
    image: imageUrl,
  });

  res
    .status(201)
    .json(new ApiResponse(201, collection, "The collection has been created successfully."));
});

// ----------------- Get All Collections -----------------
export const getAllCollections = asyncHandler(async (_req: Request, res: Response) => {
  const collections = await Collection.find().sort({ createdAt: -1 });
  res.json(new ApiResponse(200, collections));
});

// ----------------- Get Products by Collection -----------------
export const getProductsByCollection = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;

  const collection = await Collection.aggregate([
    { $match: { slug } },
    {
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "productsData",
      },
    },
  ]);

  if (!collection.length) throw new ApiError(404, "Collection not found");

  res.json(new ApiResponse(200, collection[0]));
});

// ----------------- Update Collection -----------------
export const updateCollection = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, isFeatured, isPublished, products } = req.body;

  const collection = await Collection.findById(id);
  if (!collection) throw new ApiError(404, "Collection not found");

  if (req.file) {
    // delete old image
    if (collection.image) {
      const oldFile = collection.image.split("/").pop();
      if (oldFile) await fileService.deleteFile("collections", oldFile);
    }

    const customName = fileService.generateFileName(
      req.file.originalname,
      slugify(name || collection.name, { lower: true, strict: true })
    );
    await fileService.moveFile(req.file.path, "collections", customName);
    collection.image = fileService.getFileUrl("collections", customName);
  }

  if (name) {
    collection.name = name;
    collection.slug = slugify(name, { lower: true, strict: true });
  }
  if (description !== undefined) collection.description = description;
  if (isFeatured !== undefined) collection.isFeatured = isFeatured;
  if (isPublished !== undefined) collection.isPublished = isPublished;
  if (products !== undefined) collection.products = products;

  await collection.save();
  res.json(new ApiResponse(200, collection, "Collection updated"));
});

// ----------------- Delete Collection -----------------
export const deleteCollection = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Collection.findByIdAndDelete(id);

  if (!deleted) throw new ApiError(404, "Collection not found");

  if (deleted.image) {
    const oldFile = deleted.image.split("/").pop();
    if (oldFile) await fileService.deleteFile("collections", oldFile);
  }

  res.json(new ApiResponse(200, null, "Collection deleted"));
});

// ----------------- Toggle Published -----------------
export const togglePublished = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const collection = await Collection.findById(id);

  if (!collection) throw new ApiError(404, "Collection not found");

  collection.isPublished = !collection.isPublished;
  await collection.save();

  const message = collection.isPublished
    ? "Collection published"
    : "Collection unpublished";


  res.json(new ApiResponse(200, collection, message));
});
// ----------------- Toggle Published -----------------
export const toggleFeatured = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const collection = await Collection.findById(id);

  if (!collection) throw new ApiError(404, "Collection not found");

  collection.isFeatured = !collection.isFeatured;
  await collection.save();

  const message = collection.isFeatured
    ? "Collection Added to Featured"
    : "Collection Removed from Featured";


  res.json(new ApiResponse(200, collection, message));
});

// ----------------- Bulk Delete -----------------
export const bulkDeleteCollections = asyncHandler(async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) throw new ApiError(400, "Invalid ids");

  const collections = await Collection.find({ _id: { $in: ids } });
  await Promise.all(
    collections.map(async (col) => {
      if (col.image) {
        const oldFile = col.image.split("/").pop();
        if (oldFile) await fileService.deleteFile("collections", oldFile);
      }
    })
  );

  await Collection.deleteMany({ _id: { $in: ids } });
  res.json(new ApiResponse(200, null, "Collections deleted"));
});

// ----------------- Get All Collections With Products -----------------
export const getAllCollectionsWithProducts = asyncHandler(async (_req: Request, res: Response) => {
  const collections = await Collection.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "products",
        foreignField: "_id",
        as: "productsData",
      },
    },
    { $sort: { createdAt: -1 } },
  ]);

  res.json(new ApiResponse(200, collections));
});

// ----------------- Import Collections (JSON or CSV) -----------------
export const importCollections = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");

  const ext = req.file.originalname.split(".").pop()?.toLowerCase();

  if (ext === "json") {
    const rawData = await fs.promises.readFile(req.file.path, "utf-8");
    const parsed = JSON.parse(rawData);

    const data = parsed.map((col: any) => ({
      name: col.name,
      slug: slugify(col.name, { lower: true, strict: true }),
      description: col.description || "",
      products: col.products || [],
      isFeatured: !!col.isFeatured,
      isPublished: !!col.isPublished,
      image: col.image || "",
      createdAt: col.createdAt || new Date(),
      updatedAt: col.updatedAt || new Date(),
    }));

    await Collection.insertMany(data);
    return res.json(new ApiResponse(200, null, "Collections imported from JSON"));
  }

  if (ext === "csv") {
    const results: any[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(req.file!.path)
        .pipe(csv())
        .on("data", (row) => {
          results.push({
            name: row.Name,
            slug: slugify(row.Name, { lower: true, strict: true }),
            description: row.Description,
            products: row.Products ? row.Products.split("|") : [],
            isFeatured: row.Featured === "true",
            isPublished: row.Published === "true",
            image: row.Image,
            createdAt: row["Created At"] || new Date(),
            updatedAt: row["Updated At"] || new Date(),
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    await Collection.insertMany(results);
    return res.json(new ApiResponse(200, null, "Collections imported from CSV"));
  }

  throw new ApiError(400, "Unsupported file format");
});

