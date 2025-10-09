// routes/categoryRoutes.js
import express from "express";
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "../controllers/categoryController.js";
import multer from "multer";
const categoryrouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

categoryrouter.post("/add", upload.single("image"), addCategory);
categoryrouter.put("/update/:id", updateCategory);
categoryrouter.delete("/delete/:id", deleteCategory);
categoryrouter.get("/list", getCategories);
categoryrouter.get("/:id", getCategory);

export default categoryrouter;
