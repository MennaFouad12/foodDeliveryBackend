import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 5000;
//middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

//db connection
connectDB()
app.get("/", (req, res) => {
  res.status(200).send("hello world");
})
// api routes
  app.use("/api/food", foodRouter);
  app.use("/images", express.static("uploads"));
  app.use("/api/user",userRouter);
  app.use("/api/cart",cartRouter);
  app.use("/api/order",orderRouter);


  if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
  
export default app;

// mongodb+srv://MennaAhmed:Manoun1912.@cluster0.gjcm4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0