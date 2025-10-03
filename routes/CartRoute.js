

import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import { authenticate } from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.post("/addToCart/:id", authenticate , addToCart);
cartRouter.get("/getCart",authenticate , getCart);
cartRouter.post("/removeFromCart/:id",authenticate , removeFromCart);

export default cartRouter;