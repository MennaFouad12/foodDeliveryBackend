import express from "express";
import multer from "multer";
import { addFood, getProductsByCategory, listFoods, removeFood } from "../controllers/foodController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js"; 

const foodRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Admin Routes (Protected)
foodRouter.post("/add", authenticate, authorizeRoles('admin'), upload.single("image"), addFood);
foodRouter.delete("/remove/:id", authenticate, authorizeRoles('admin'), removeFood);

// Public Routes
foodRouter.get("/list", listFoods);
foodRouter.get("/category/:categoryName", getProductsByCategory);

export default foodRouter;