import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();


orderRouter.post("/",  createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.get("/:orderId", getOrderById);
orderRouter.delete("/:orderId",  deleteOrderById);
orderRouter.patch("/:orderId", updateOrder);

export default orderRouter;
