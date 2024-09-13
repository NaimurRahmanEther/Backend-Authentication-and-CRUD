const errorHandler = require("../middlewares/error");
const tasksModel=require("../models/tasks")

const newTask=async(req,res,next)=>{
    console.log("ok done");
  try {
    let {title,description}=req.body
    console.log(req.body);
    await tasksModel.create({
        title,description,user:req.user
    })
    res.status(201).json({
        success:true,
        message:"Tasked add successfully"
    })
    
  } catch (error) {
     next(error)
  }
}

const getMyTask=async (req,res,next)=>{
   try {
    const tasks=await tasksModel.find({user:req.user._id})
    res.status(200).json({
        success:true,
        tasks
    })
   } catch (error) {
      next(error)
   }
}

const updateTask=async(req,res,next)=>{
    try {
        const task=await tasksModel.findById(req.params.id)
        if(!task) return next(new errorHandler("Task not found",404))
            task.isCompleted= !task.isCompleted
        await task.save()
        res.status(200).json({
             success:true,
            message:"Task updated!"
        })
    } catch (error) {
        next(error)
    }
}
const deleteTask=async(req,res,next)=>{
    try {
        const task=await tasksModel.findById(req.params.id)
        if(!task) return next(new errorHandler("Task not found",404))
           console.log(task);
       await task.deleteOne()
        res.status(200).json({
             success:true,
            message:"Task Deleted!"
        })
    } catch (error) {
        next(error)
    }
}


module.exports={newTask,getMyTask,updateTask,deleteTask}