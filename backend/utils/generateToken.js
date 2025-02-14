const jwt=require("jsonwebtoken")
const env_var = require("../config/env_var")

async function generateTokenAddCookie(user_id,res) {
    let token=jwt.sign({user_id},env_var.jwt_secrect,{expiresIn:"15d"})
    res.cookie("jwt-netflix",token,{
        maxAge: 15 * 24 * 60 *60 *1000,
        httpOnly:true,
        sameSite:"strict",
        secure:env_var.NODE_ENV !=="development", 
    })
}
module.exports=generateTokenAddCookie;