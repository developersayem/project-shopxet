import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../../controller/admin/order.controller";

const router = Router();

//* Route for create order
router.post("/", createOrder);

// * Route for get all orders
router.get("/", getOrders);

// * Route for get single order
router.get("/:id", getOrderById);

// * Route for update order
router.put("/:id", updateOrder);

// * Route for delete order
router.delete("/:id", deleteOrder);

export default router;
