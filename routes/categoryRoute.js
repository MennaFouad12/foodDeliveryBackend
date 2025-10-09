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
import { authenticate, authorizeRoles } from "../middleware/auth.js";
// import authMiddleware from "../middleware/auth.js";
const categoryrouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

categoryrouter.post("/add",authenticate,authorizeRoles("admin") ,upload.single("image"), addCategory);
categoryrouter.put("/update/:id",authenticate,authorizeRoles("admin"), upload.single("image"), updateCategory);
categoryrouter.delete("/delete/:id",authenticate,authorizeRoles("admin"), deleteCategory);
categoryrouter.get("/list", getCategories);
categoryrouter.get("/:id", getCategory);

export default categoryrouter;
