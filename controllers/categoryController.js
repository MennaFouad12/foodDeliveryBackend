// controllers/categoryController.js

import CategoryModel from "../models/categorymodel.js";


// ✅ Add Category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    const exists = await CategoryModel.findOne({ name });
    if (exists) return res.status(400).json({ error: "Category already exists" });

    const newCategory = new CategoryModel({ name });
    await newCategory.save();

    res.status(201).json({ success: true, category: newCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) return res.status(404).json({ error: "Category not found" });

    res.json({ success: true, category: updatedCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CategoryModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Category not found" });

    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().sort({ name: 1 });
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
