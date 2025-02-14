const jwt= require("jsonwebtoken")
const env_var=require("../config/env_var")
const { cookie, json } = require("express/lib/response");
const User = require("../models/user.models");

async function protectRoute(req,res,next) {
    try {
        const token=req.cookies['jwt-netflix'];

        if(!token){
            return res.status(401).json({sucess:false,message:"UnAuthorized - No token provided"})
        }

        const verifed=jwt.verify(token,env_var.jwt_secrect);
        if(!verifed){
            return res.status(401).json({sucess:false,message:"UnAuthorized - Invalid Token"})
        }
        const user= await User.findById(verifed.user_id).select("-password");
        console.log(user);
        if(!user){
            return res.status(401).json({sucess:false,message:"User Not Found"});
        }
        req.user=user;

        next()
    } catch (error) {
        console.log("Error in ProtectRoute Page",error.message);
        return res.status(500),json({sucess:false,message:"Internal Server-Error"})
    }
}
module.exports=protectRoute