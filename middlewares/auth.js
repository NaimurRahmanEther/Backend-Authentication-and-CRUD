const jwt=require("jsonwebtoken")
const userModel=require("../models/user")
const dotenv=require("dotenv")
dotenv.config({
  path:"../.env"
})

const isAuthenticated= async(req,res,next)=>{
   const token=req.cookies.token
   if(!token) 
    return res.status(404).json({
   success:false,
   message:"Login First"
})
  const decode=jwt.verify(token,process.env.KEY)
  req.user=await userModel.findById(decode._id)
  next()
}

module.exports=isAuthenticated