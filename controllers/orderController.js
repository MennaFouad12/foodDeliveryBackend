

import OrderModel from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config(); // make sure this runs before using process.env

console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY?.slice(0, 8)); 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20", // latest supported
});
const placeOrder=async(req,res)=>{
const frontendUrl="https://food-delivery-frontend-sigma-ebon.vercel.app";
  try {
    // const {token,amount}=req.body;
    const newOrder=await OrderModel.create({
      userId:req.user.id,
      items:req.body.items,
      amount:req.body.amount,
      address:req.body.address,
      status:"Food Processing"
    })
    await newOrder.save();
    await User.findOneAndUpdate({_id:req.user.id},{cartData:{}});
  const line_items=req.body.items.map((item)=>({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name,
        
      },
      unit_amount: item.price * 100*80,
    },
    quantity: item.quantity
  }))
  line_items.push({
    price_data: {
      currency: "inr",
      product_data: {
        name: "Delivery Charges",
        
      },
      unit_amount: 2*100*80,
    },
    quantity: 1
  })

  const session=await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items,
    mode:"payment",
    success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,//frontendUrl,
    cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`//frontendUrl
  })
  res.status(200).json({url:session.url,success:true});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
  }
}


const getAllOrders=async(req,res)=>{
  try {
    const orders=await OrderModel.find();
    res.status(200).json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
  }
}



export {placeOrder,getAllOrders};