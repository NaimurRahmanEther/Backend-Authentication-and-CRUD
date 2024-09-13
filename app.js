const express =require("express")
const app=express()
const userModel=require("./models/user")
const tasksModel=require("./models/tasks")
const userRouter=require("./routes/user")
const taskRouter=require("./routes/tasks")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const dotenv=require("dotenv")
const errorMiddleware=require("./middlewares/error")

//config


//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/user", userRouter);
app.use("/tasks", taskRouter);


app.get("/",(req,res)=>{
    res.send("ok")

})

app.use(errorMiddleware)

module.exports=app