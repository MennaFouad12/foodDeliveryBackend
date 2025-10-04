// import express from "express";
// import multer from "multer";
// <<<<<<< HEAD
// import { addFood, getProductsByCategory, listFoods, removeFood, updateFood } from "../controllers/foodController.js";
// import authMiddleware from "../middleware/auth.js";
// =======
// import { addFood, getProductsByCategory, listFoods, removeFood } from "../controllers/foodController.js";
// import { authenticate, authorizeRoles } from "../middleware/auth.js"; 
// >>>>>>> marwan

// const foodRouter = express.Router();

// const upload = multer({ storage: multer.memoryStorage() });

// <<<<<<< HEAD
// foodRouter.post("/add",authMiddleware, upload.single("image"), addFood);
// foodRouter.put("/update/:id",authMiddleware, upload.single("image"), updateFood);

// foodRouter.get("/list", listFoods);
// foodRouter.delete("/remove/:id",authMiddleware, removeFood);
// =======
// // Admin Routes (Protected)
// foodRouter.post("/add", authenticate, authorizeRoles('admin'), upload.single("image"), addFood);
// foodRouter.delete("/remove/:id", authenticate, authorizeRoles('admin'), removeFood);

// // Public Routes
// foodRouter.get("/list", listFoods);
// >>>>>>> marwan
// foodRouter.get("/category/:categoryName", getProductsByCategory);

// export default foodRouter;






















import express from "express";
import multer from "multer";
import { 
  addFood, 
  getProductsByCategory, 
  listFoods, 
  removeFood, 
  updateFood 
} from "../controllers/foodController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const foodRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// ✅ Admin Routes (Protected)
foodRouter.post("/add", authenticate, authorizeRoles("admin"), upload.single("image"), addFood);
foodRouter.put("/update/:id", authenticate, authorizeRoles("admin"), upload.single("image"), updateFood);
foodRouter.delete("/remove/:id", authenticate, authorizeRoles("admin"), removeFood);

// ✅ Public Routes
foodRouter.get("/list", listFoods);
foodRouter.get("/category/:categoryName", getProductsByCategory);

export default foodRouter;
