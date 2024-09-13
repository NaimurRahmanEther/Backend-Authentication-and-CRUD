const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

dotenv.config({
    path:"../.env"
})

const sendCookie=(user,res,message,statusCode)=>{
    const token=jwt.sign({_id:user._id},process.env.KEY)
    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*100,
    
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?"false":"true",
    }).json({
         success:true,
         message
    })
}

module.exports=sendCookie