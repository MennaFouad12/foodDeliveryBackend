
import express from "express";
import { getAllOrders, placeOrder } from "../controllers/orderController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.post("/placeOrder", authenticate,authorizeRoles("user","admin"), placeOrder);
orderRouter.get("/getAllOrders", authenticate,authorizeRoles("admin"), getAllOrders);
export default orderRouter;