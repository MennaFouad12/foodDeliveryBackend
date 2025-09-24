

import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";



 const addToCart = async(req, res) => {
  try {
  
  let userData= await User.findOne({_id:req.user.id});
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
  let cartData=await userData.cartData;
  if(!cartData[req.params.id]){
    cartData[req.params.id]=1;
  }
  else{
    cartData[req.params.id]++;
  }
await User.findOneAndUpdate({_id:req.user.id},{cartData:cartData});
    res.status(200).json({ message: "Item added to cart successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
const removeFromCart = async(req, res) => {
  try {
  
  let userData= await User.findOne({_id:req.user.id});
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
  let cartData=await userData.cartData;
  if(cartData[req.params.id]>0){
    cartData[req.params.id]--;
  }
  await User.findOneAndUpdate({_id:req.user.id},{cartData:cartData});
    res.status(200).json({ message: "Item removed from cart successfully" });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
const getCart = async(req, res) => {
  try {
  let userData= await User.findOne({_id:req.user.id});
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
      let cartData=await userData.cartData;

    res.status(200).json({ cartData: cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export {addToCart,getCart,removeFromCart}