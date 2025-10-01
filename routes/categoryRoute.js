// routes/categoryRoutes.js
import express from "express";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categoryController.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
const categoryrouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

categoryrouter.post("/add",authMiddleware ,upload.single("image"), addCategory);
categoryrouter.put("/update/:id",authMiddleware, updateCategory);
categoryrouter.delete("/delete/:id",authMiddleware, deleteCategory);
categoryrouter.get("/list", getCategories);

export default categoryrouter;
