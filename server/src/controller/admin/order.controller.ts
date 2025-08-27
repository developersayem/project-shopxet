import { Request, Response, NextFunction } from "express";
import {Order} from "../../models/order.model";

// * Create Order (Customer checkout)
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customer, items } = req.body;

    if (!customer || !items || !items.length) {
      return res.status(400).json({ message: "Customer info and items are required" });
    }

    // Optional: calculate total snapshot price
    const orderItems = items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity || 1,
      price: item.price, // price at order time
    }));

    const order = await Order.create({
      customer,
      items: orderItems,
      paymentMethod: "COD",
      status: "pending",
    });

    res.status(201).json({ message: "Order created successfully ✅", order });
  } catch (error) {
    next(error);
  }
};

// * Get All Orders (Admin)
export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find().populate("items.productId").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// * Get Single Order (Admin)
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.productId");
    if (!order) return res.status(404).json({ message: "Order not found ❌" });

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// * Update Order Status (Admin)
export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found ❌" });

    // Only allow updating status
    if (status) order.status = status;
    await order.save();

    res.json({ message: "Order updated successfully ✅", order });
  } catch (error) {
    next(error);
  }
};

// * Delete Order (Admin)
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found ❌" });

    res.json({ message: "Order deleted successfully ✅" });
  } catch (error) {
    next(error);
  }
};
