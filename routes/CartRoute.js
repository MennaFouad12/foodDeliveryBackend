

import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/addToCart/:id", authMiddleware, addToCart);
cartRouter.get("/getCart",authMiddleware, getCart);
cartRouter.post("/removeFromCart/:id",authMiddleware, removeFromCart);

export default cartRouter;