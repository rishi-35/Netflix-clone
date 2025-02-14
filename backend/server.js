const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('.env file loaded successfully');
}
const express= require("express")
const app=express();
const authRoute=require('./routes/auth.routs.js');
const movieRoute=require('./routes/movies.routs.js');
const tvRoute=require('./routes/tv.routs.js');
const searchRoute=require('./routes/search.routes.js');
const { PORT } = require("./config/env_var.js");
const { connect } = require("mongoose");
const connectDB = require("./config/db.js");
const protectRoute = require("./middlewares/protectRoute.js");
const cookieParser = require("cookie-parser");
const path=require('path');
const env_var = require("./config/env_var.js");




app.use(cookieParser())
app.use(express.json()) //this will help in passing req.body
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/movie",protectRoute,movieRoute)
app.use("/api/v1/tv",protectRoute,tvRoute)
app.use("/api/v1/search",protectRoute,searchRoute)

if(env_var.NODE_ENV==='production'){
    app.use(express.static(path.join(path.resolve(),'/frontend/dist')));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(path.resolve(),'frontend','dist','index.html'));
    })
}

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:`+PORT);
    connectDB()
})