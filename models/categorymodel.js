// models/Category.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // prevent duplicates
    trim: true,
  },
  
  image: {
    type: String, // هتخزن اللينك أو اسم الملف
    required: true,
  },
});

const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel;
