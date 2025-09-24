
// import mongoose from "mongoose";




// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   isAdmin: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
//   cartData:{type:Object,default:{}}
// },{minimize:false});

//  const userModel= mongoose.models.User || mongoose.model("User", userSchema); 
//  export default userModel; 
// // export default mongoose.model("User", userSchema);



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // ✅ put schema options here
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
