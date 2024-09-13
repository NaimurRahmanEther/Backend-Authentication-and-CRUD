const mongoose = require("mongoose");
const dotenv =require("dotenv")

dotenv.config({
  path:"../.env"
})

console.log(process.env.MONGO_URI);

const mongoDB = () => {
     mongoose.connect(process.env.MONGO_URI,{
        dbName:"backendApp"
     })
    .then((e) => {
        console.log(`Database is running on host:${e.connection.host}`);
    })
    .catch((err) => {
        console.log(err);
    });
};

module.exports = mongoDB;
