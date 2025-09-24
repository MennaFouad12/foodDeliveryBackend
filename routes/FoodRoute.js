
// import express from "express";
// //  import { addFood } from "../controllers/foodController";
//  import multer from "multer";
// import { addFood, listFoods,removeFood } from "../controllers/foodController.js";
//  const foodRouter = express.Router();
// //image storage Engine
// const storage = multer.diskStorage({
//   destination: "uploads",
//     filename: function (req, file, cb) {
//     cb(null,`${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });





// foodRouter.post("/add",upload.single("image"),addFood)
// foodRouter.get("/list",listFoods)
// foodRouter.post("/remove/:id",removeFood)
//  export default foodRouter;


import express from "express";
import multer from "multer";
import { addFood, getProductsByCategory, listFoods, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Multer with memory storage (keeps file in memory as a Buffer)
const upload = multer({ storage: multer.memoryStorage() });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFoods);
foodRouter.delete("/remove/:id", removeFood);
foodRouter.get("/category/:categoryName", getProductsByCategory);

export default foodRouter; 
