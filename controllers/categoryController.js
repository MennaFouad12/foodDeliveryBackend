// controllers/categoryController.js

import CategoryModel from "../models/categorymodel.js";
import cloudinary from "../config/cloudinary.js";

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "categories" }, // cloudinary folder
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer); // push the buffer into the upload stream
  });
};

// ✅ Add Category
// export const addCategory = async (req, res) => {
//   try {
//     const { name } = req.body;

//     if (!name) return res.status(400).json({ error: "Name is required" });

//     const exists = await CategoryModel.findOne({ name });
//     if (exists) return res.status(400).json({ error: "Category already exists" });

//     let imageUrl = null;
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       imageUrl = result.secure_url;
//     }

//     const category = await CategoryModel.create({
//       name,
//       image: imageUrl,
//     });

//     res.status(201).json({ message: "Category added successfully", category });
//   } catch (error) {
//     console.error("Error adding category:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const exists = await CategoryModel.findOne({ name });
    if (exists) return res.status(400).json({ error: "Category already exists" });

    const result = await uploadToCloudinary(req.file.buffer);

    const category = await CategoryModel.create({
      name,
      image: result.secure_url,
    });

    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: error.message });
  }
};


// ✅ Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    let updateData = { name };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedCategory) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CategoryModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Categories
// export const getCategories = async (req, res) => {
//   try {
//     const categories = await CategoryModel.find().sort({ name: 1 });
//     res.json({ success: true, categories });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.aggregate([
      {
        $lookup: {
          from: "foods", // collection name in MongoDB (lowercase + plural)
          localField: "name",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          productCount: { $size: "$foods" },
        },
      },
      { $sort: { name: 1 } },
    ]);

    res.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
