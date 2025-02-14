const mongoose =require('mongoose');
const { MONGO_URI } = require('./env_var');
// const { MONGO_URI } = require('./env_var')

async function connectDB() {
    try{
        const cnn= mongoose.connect(MONGO_URI);
        console.log("Database connected ")

    }
    catch(err){
        console.error("Database connection faild"+err);
        process.exit(1) //1 means failure 0 means sucess
    }
}
module.exports=connectDB;