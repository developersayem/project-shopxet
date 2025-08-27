import { Request, Response, NextFunction } from "express";
import { Product } from "../../models/product.model";

// * Create Product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, discountPrice, images, category, inStock } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      images,
      category,
      inStock,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully ✅", product });
  } catch (error) {
    next(error);
  }
};

// * Get All Products
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find().populate("category").sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// * Get Single Product
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found ❌" });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// * Update Product
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found ❌" });
    }

    res.json({ message: "Product updated successfully ✅", product });
  } catch (error) {
    next(error);
  }
};

// * Delete Product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found ❌" });
    }

    res.json({ message: "Product deleted successfully ✅" });
  } catch (error) {
    next(error);
  }
};
