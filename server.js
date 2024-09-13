const app=require("./app")
const dotenv=require("dotenv")
const mongoDB=require("./data/database")

dotenv.config({
    path:"./.env"
})


mongoDB()


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})
