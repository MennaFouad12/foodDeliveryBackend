
import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.post("/placeOrder", authenticate, placeOrder);
export default orderRouter;