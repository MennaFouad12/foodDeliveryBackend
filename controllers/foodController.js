
import FoodModel from "../models/foodemodel.js"
import fs from "fs" 


const addFood = async (req, res) => {
  try {
    let image =`${req.file.filename}`;
    const {name, price, description, category} = req.body
    const food = await FoodModel.create({
      name,
      image,
      price,
      description,
      category
    })
    res.status(200).json({message: "Food added successfully",food})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }
}
const listFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find()
    res.status(200).json({success: true,data: foods})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }
}
const removeFood = async (req, res) => {
  try {
    const {id} = req.params
    const food = await FoodModel.findById(id)
    fs.unlinkSync(`./uploads/${food.image}`)
      await FoodModel.findByIdAndDelete(id)
    res.status(200).json({success: true,data: food})
  } catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
  }
}

export {addFood,listFoods,removeFood}