
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
     ref: "Category",
    required: true,
  },
});

const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default FoodModel;