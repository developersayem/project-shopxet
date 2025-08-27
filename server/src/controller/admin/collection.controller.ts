import { Request, Response, NextFunction } from "express";
import {Collection} from "../../models/collection.model";
import {Product} from "../../models/product.model";

// * Create Collection
export const createCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, products } = req.body;

    if (!name) return res.status(400).json({ message: "Collection name is required" });

    const collection = await Collection.create({
      name,
      description,
      products: products || [],
    });

    res.status(201).json({ message: "Collection created successfully ✅", collection });
  } catch (error) {
    next(error);
  }
};

// * Get All Collections
export const getCollections = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collections = await Collection.find().populate("products").sort({ createdAt: -1 });
    res.json(collections);
  } catch (error) {
    next(error);
  }
};

// * Get Single Collection
export const getCollectionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collection = await Collection.findById(req.params.id).populate("products");
    if (!collection) return res.status(404).json({ message: "Collection not found ❌" });

    res.json(collection);
  } catch (error) {
    next(error);
  }
};

// * Update Collection
export const updateCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, products } = req.body;

    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Collection not found ❌" });

    if (name) collection.name = name;
    if (description) collection.description = description;
    if (products) collection.products = products;

    await collection.save();

    res.json({ message: "Collection updated successfully ✅", collection });
  } catch (error) {
    next(error);
  }
};

// * Delete Collection
export const deleteCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) return res.status(404).json({ message: "Collection not found ❌" });

    res.json({ message: "Collection deleted successfully ✅" });
  } catch (error) {
    next(error);
  }
};

// * Add Product to Collection
export const addProductToCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.body;

    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Collection not found ❌" });

    // Avoid duplicates
    if (!collection.products.includes(productId)) {
      collection.products.push(productId);
      await collection.save();
    }

    res.json({ message: "Product added to collection ✅", collection });
  } catch (error) {
    next(error);
  }
};

// * Remove Product from Collection
export const removeProductFromCollection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.body;

    const collection = await Collection.findById(req.params.id);
    if (!collection) return res.status(404).json({ message: "Collection not found ❌" });

    collection.products = collection.products.filter(p => p.toString() !== productId);
    await collection.save();

    res.json({ message: "Product removed from collection ✅", collection });
  } catch (error) {
    next(error);
  }
};
