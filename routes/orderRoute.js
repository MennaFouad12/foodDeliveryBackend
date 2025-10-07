
import express from "express";
import { getAllOrders, placeOrder } from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.post("/placeOrder", authenticate, placeOrder);
orderRouter.get("/getAllOrders", authenticate, getAllOrders);
export default orderRouter;