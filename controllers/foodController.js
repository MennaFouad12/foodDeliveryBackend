
// import FoodModel from "../models/foodemodel.js"
// import fs from "fs" 


// const addFood = async (req, res) => {
//   try {
//     let image =`${req.file.filename}`;
//     const {name, price, description, category} = req.body
//     const food = await FoodModel.create({
//       name,
//       image,
//       price,
//       description,
//       category
//     })
//     res.status(200).json({message: "Food added successfully",food})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({error: error.message})
//   }
// }
// const listFoods = async (req, res) => {
//   try {
//     const foods = await FoodModel.find()
//     res.status(200).json({success: true,data: foods})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({error: error.message})
//   }
// }
// const removeFood = async (req, res) => {
//   try {
//     const {id} = req.params
//     const food = await FoodModel.findById(id)
//     fs.unlinkSync(`./uploads/${food.image}`)
//       await FoodModel.findByIdAndDelete(id)
//     res.status(200).json({success: true,data: food})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({error: error.message})
//   }
// }

// export {addFood,listFoods,removeFood}




import FoodModel from "../models/foodemodel.js";
import cloudinary from "../config/cloudinary.js";
import CategoryModel from "../models/categorymodel.js";

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "foods" }, // cloudinary folder
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer); // push the buffer into the upload stream
  });
};

// ✅ Add food
const addFood = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    let imageUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const food = await FoodModel.create({
      name,
      image: imageUrl,
      price,
      description,
      category,
    });

    res.status(200).json({ message: "Food added successfully", food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ List foods
const listFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Remove food
const removeFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await FoodModel.findById(id);

    if (!food) return res.status(404).json({ error: "Food not found" });

    // Extract public_id from the Cloudinary URL
    const publicId = food.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`foods/${publicId}`);

    await FoodModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};




const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const category = await CategoryModel.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const foods = await FoodModel.find({ category: categoryName });

    res.status(200).json({
      success: true,
      count: foods.length,
      category: categoryName,
      foods,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export { addFood, listFoods, removeFood,getProductsByCategory };
